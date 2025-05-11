import os
import re
import sys
import pdfplumber
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def safe_print(msg: str):
    try:
        sys.stdout.buffer.write((msg + '\n').encode('utf-8'))
        sys.stdout.flush()
    except Exception as e:
        pass  # 에러 무시

def is_valid_class_idx(text):
    return text.isdigit()

def extract_classes_from_table(table):
    results = []
    for row in table:
        row = [cell.strip() if cell else "" for cell in row]
        if len(row) < 9 or not is_valid_class_idx(row[0]):
            continue

        raw_class_name = row[3]
        class_name = re.sub(r"\s*\(.*?\)", "", raw_class_name).strip()
        class_credit = row[4]
        prof_name = row[8]
        option = row[9] if len(row) > 9 else ""

        # 담당교수 없으면 skip
        if not prof_name:
            continue

        results.append({
            "class_name": class_name,
            "class_credit": int(class_credit) if class_credit.isdigit() else 0,
            "prof_name": prof_name,
            "option": option
        })
    return results


# 사용법 안내 및 인자 확인
if len(sys.argv) < 3:
    print("사용법: python pdf_plumber.py [pdf경로] [학기명 예: 2024-여름]")
    sys.exit(1)

pdf_path = sys.argv[1]
semester = sys.argv[2]

# 현재 스크립트가 있는 디렉토리 (python 폴더)
base_dir = os.path.dirname(os.path.abspath(__file__))
klas_lecture_path = os.path.join(base_dir, "season_klas.py")
updateClassTime_path = os.path.join(base_dir, "..", "scripts", "updateClassTime.js")
updateClassroom_path = os.path.join(base_dir, "..", "scripts", "updateClassroom.js")

# 1. MongoDB 연결
print(f"[1] MongoDB connecting...")
client = MongoClient(os.getenv("MONGO_URI_CLASS"))
db = client["class"]
print(f"[1-1] MongoDB connect success")

# 2. PDF 열기
safe_print(f"[2] PDF opening: {pdf_path}")

# 기존 학기 컬렉션 삭제
if semester in db.list_collection_names():
    print(f"[2-1] original {semester} collection delete")
    db[semester].drop()

collection = db[semester]

# 3. 테이블 기반으로 데이터 추출
total_inserted = 0
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            class_data = extract_classes_from_table(table)
            if class_data:
                collection.insert_many(class_data)
                total_inserted += len(class_data)

print(f"[3] total {total_inserted}class save.")
