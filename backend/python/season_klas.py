import os
import sys
import time
import re
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from dotenv import load_dotenv

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# .env 로드
load_dotenv()

# MongoDB 연결
client = MongoClient(os.getenv("MONGO_URI_CLASS"))
db = client["class"]

# Chrome 드라이버 설정
chrome_options = Options()
# chrome_options.add_argument("--headless=new")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# 경고창 처리
def handle_alert():
    try:
        alert = driver.switch_to.alert
        alert_text = alert.text
        if "폐강된 강의입니다" in alert_text:
            print("폐강된 강의입니다. 경고창을 닫고 넘어갑니다.")
            alert.accept()
            return True
    except NoAlertPresentException:
        return False
    return False

# 로그인 함수
def login_klas():
    driver.get("https://klas.kw.ac.kr/usr/cmn/login/LoginForm.do")
    time.sleep(2)
    driver.find_element(By.ID, "loginId").send_keys(os.getenv("klas_ID"))
    driver.find_element(By.ID, "loginPwd").send_keys(os.getenv("klas_PASSWORD"))
    driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div[2]/form/div[2]/button').click()
    time.sleep(5)

def parse_class_info(info_text):
    # 예: '컴퓨터구조 - 001' -> '컴퓨터구조'
    return info_text.split('-')[0].strip()

def parse_classroom(text):
    # 괄호 안의 내용을 추출하고, 첫 번째 항목만 반환
    matches = re.findall(r'\((.*?)\)', text)
    return matches[0] if matches else ""

def parse_daytime(text):
    # 괄호 및 괄호 안의 내용 제거 후 '교시' 제거 및 공백 제거
    text_no_room = re.sub(r'\(.*?\)', '', text)
    return text_no_room.replace('교시', '').replace(' ', '')


def crawl_season(collection_name):
    season_map = {
        "여름": "여름학기",
        "겨울": "겨울학기"
    }

    year, season = collection_name.split("-")
    collection = db[collection_name]
    season_text = season_map.get(season, season)

    login_klas()
    driver.get("https://klas.kw.ac.kr/std/cps/atnlc/LectrePlanStdPage.do")
    time.sleep(3)

    # 연도 선택
    year_dropdown = driver.find_element(By.XPATH, '//*[@id="selectYear"]')
    year_dropdown.click()
    time.sleep(1)
    year_options = driver.find_elements(By.XPATH, '//*[@id="selectYear"]/option')
    for y in year_options:
        if y.text.strip().startswith(year):
            y.click()
            break

    # 학기 선택
    term_dropdown = driver.find_element(By.XPATH, '//*[@id="selecthakgi"]')
    term_dropdown.click()
    time.sleep(1)
    term_options = driver.find_elements(By.XPATH, '//*[@id="selecthakgi"]/option')
    for t in term_options:
        if season_text in t.text.strip():
            t.click()
            break

    # 교수명 입력 및 조회 버튼 클릭
    prof_input_xpath = '//*[@id="appModule"]/div[2]/div[2]/table[1]/tbody/tr[2]/td[2]/input'
    search_button_xpath = '//*[@id="appModule"]/div[2]/div[2]/div/button'

    prof_names = collection.distinct("prof_name")

    for prof in prof_names:
        if not prof.strip():
            continue

        wait = WebDriverWait(driver, 10)
        input_box = wait.until(EC.element_to_be_clickable((By.XPATH, prof_input_xpath)))
        input_box.clear()
        input_box.send_keys(prof)
        time.sleep(0.5)

        search_button = driver.find_element(By.XPATH, search_button_xpath)
        search_button.click()
        time.sleep(2)

        print(f"[조회 완료] 교수명: {prof}")

        tr_idx = 1
        while True:
            try:
                row_xpath = f'//*[@id="appModule"]/div[2]/div[2]/table[2]/tbody/tr[{tr_idx}]'
                driver.find_element(By.XPATH, row_xpath).click()
                time.sleep(1)

                if handle_alert():
                    tr_idx += 1
                    continue

                # 상세 페이지 데이터 추출
                class_info_xpath = '//*[@id="appModule"]/div[2]/div[2]/table[1]/tbody/tr[1]/td[1]'
                class_prof_xpath = '//*[@id="appModule"]/div[2]/div[2]/table[1]/tbody/tr[5]/td[1]'
                classroom_xpath = '//*[@id="appModule"]/div[2]/div[2]/table[1]/tbody/tr[4]/td[1]'
                fallback_classroom_xpath = '//*[@id="appModule"]/div[2]/div[2]/table[1]/tbody/tr[5]/td[1]'

                class_info = driver.find_element(By.XPATH, class_info_xpath).text
                class_prof = driver.find_element(By.XPATH, class_prof_xpath).text.strip()

                classroom_element = driver.find_element(By.XPATH, classroom_xpath)
                classroom_text = classroom_element.text.strip()

                # 빈 값일 경우 fallback xpath 사용
                if not classroom_text:
                    fallback_element = driver.find_element(By.XPATH, fallback_classroom_xpath)
                    classroom_text = fallback_element.text.strip()

                class_name = parse_class_info(class_info)
                classroom_idx = parse_classroom(classroom_text)
                class_daytime = parse_daytime(classroom_text)

                # MongoDB 업데이트
                result = collection.update_many( 
                     {"prof_name": class_prof, "class_name": class_name},
                    {"$set": {
                        "classroom_idx": classroom_idx,
                        "class_daytime": class_daytime
                    }}
                )
                print(f"[업데이트] {class_prof} / {class_name} => matched: {result.matched_count}, modified: {result.modified_count}")

                # 뒤로가기
                back_btn_xpath = '//*[@id="appModule"]/div[2]/div[1]/span/button'
                driver.find_element(By.XPATH, back_btn_xpath).click()
                time.sleep(2)
                tr_idx += 1
            except Exception:
                break  # 더 이상 tr이 없으면 종료

# 메인 실행
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("사용법: python season_klas.py 2025-여름")
        sys.exit(1)

    collection_name = sys.argv[1]
    crawl_season(collection_name)
    # input("크롤링이 완료되었습니다. Enter 키를 누르면 브라우저가 종료됩니다...")
    driver.quit()
