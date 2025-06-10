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
    if not table or len(table) < 2:
        return results

    header = [cell.strip() for cell in table[0]]
    data_rows = table[1:]

     # 필요한 열의 인덱스를 동적으로 추출
    try:
        idx_subject = header.index("과목명")
        idx_credit = header.index("학점")
        idx_prof = header.index("담당교수")
        idx_note = header.index("비 고") if "비 고" in header else None
    except ValueError as e:
        print("[에러] 헤더를 찾을 수 없습니다:", e)
        return results

    for row in data_rows:
        row = [cell.strip() if cell else "" for cell in row]
        if len(row) <= max(idx_subject, idx_credit, idx_prof):
            continue  # 데이터 부족

        class_name_raw = row[idx_subject]
        class_name = re.sub(r"\s*\(.*?\)", "", class_name_raw).strip()

        credit = row[idx_credit]
        prof_name = row[idx_prof]
        note = row[idx_note] if idx_note is not None and idx_note < len(row) else ""

        if not prof_name:
            continue  # 담당교수 없으면 스킵

        results.append({
            "class_name": class_name,
            "class_credit": int(credit) if credit.isdigit() else 0,
            "prof_name": prof_name,
            "option": note
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
