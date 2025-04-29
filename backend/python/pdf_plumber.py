import os
import re
import subprocess
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

if len(sys.argv) < 3:
    print("사용법: python pdf_plumber.py [파일경로] [학기명 예: 2025-1]")
    sys.exit(1)

pdf_path = sys.argv[1]
semester = sys.argv[2]

# 현재 스크립트가 있는 디렉토리 (python 폴더)
base_dir = os.path.dirname(os.path.abspath(__file__))
klas_lecture_path = os.path.join(base_dir, "klas_lecture.py")
updateClassTime_path = os.path.join(base_dir, "..", "scripts", "updateClassTime.js")
updateClassroom_path = os.path.join(base_dir, "..", "scripts", "updateClassroom.js")

# 1. MongoDB 연결
print(f"[1] MongoDB connecting...")
client = MongoClient(os.getenv("MONGO_URI_CLASS"))
db = client["class"]
print(f"[1-1] MongoDB connect success")

# 2. PDF 열기
safe_print(f"[2] PDF opening: {pdf_path}")

if semester in db.list_collection_names():
    print(f"[2-1] original {semester} collection delete")
    db[semester].drop()

collection = db[semester]

# 제목에서 department, major 추출
def extract_department_and_major(title):
    if "교양" in title:
        return {"department": "교양"}
    elif "교과목" in title:
        dept = title.split("교과목")[0].strip()
        return {"department": dept}
    elif "강의시간표" in title:
        parts = title.split("강의시간표")[0].strip().split()
        if len(parts) >= 2:
            return {"department": parts[0], "major": parts[1]}
        elif parts:
            return {"department": parts[0]}
    return {}

def is_valid_class_idx(class_idx):
    return re.fullmatch(r"[A-Z0-9]{4}-\d-\d{4}-\d{2}", class_idx) is not None

def extract_classes_from_table(table, metadata):
    results = []
    for row in table:
        row = [cell.strip() if cell else "" for cell in row]
        if len(row) < 9 or not is_valid_class_idx(row[0]):
            continue

        class_idx = row[0]
        class_name = row[1]
        class_credit = row[5]
        prof_name = row[7]
        class_daytime = row[8]

        class_names = class_name.split("\n") if "\n" in class_name else [class_name]

        for name in class_names:
            entry = {
                "class_idx": class_idx,
                "class_name": name.strip(),
                "class_credit": class_credit,
                "prof_name": prof_name,
                "class_daytime": class_daytime,
                "department": metadata.get("department", "")
            }
            if "major" in metadata:
                entry["major"] = metadata["major"]
            results.append(entry)
    return results

# 3. PDF 처리 시작
print(f"[3] PDF parsing start")
all_data = []
last_metadata = {}

with pdfplumber.open(pdf_path) as pdf:
    for page_number, page in enumerate(pdf.pages):
        text = page.extract_text()
        if not text:
            print(f"[3-1] {page_number+1}page: no text")
            continue

        lines = text.split("\n")
        tables = page.extract_tables(table_settings={
            "vertical_strategy": "lines",
            "horizontal_strategy": "lines",
            "snap_y_tolerance": 3,
            "intersection_x_tolerance": 5,
            "join_tolerance": 2,
        })

        if not tables:
            print(f"[3-2] {page_number+1} page: no table")
            continue

        current_metadata = last_metadata.copy()
        for line in lines:
            if "강의시간표" in line:
                current_metadata = extract_department_and_major(line)
                last_metadata = current_metadata.copy()

        for table in tables:
            cleaned = [[cell.strip() if cell else "" for cell in row] for row in table]
            extracted = extract_classes_from_table(cleaned, current_metadata)
            all_data.extend(extracted)

print(f"[3-3] total data parsing - total {len(all_data)}data")

# 4. MongoDB 저장
if all_data:
    print(f"[4] MongoDB saving start...")
    collection.insert_many(all_data)
    print(f"[4-1] {len(all_data)} number [{semester}] collection save success")
else:
    print(f"[4-2] no saving data.")
    sys.exit(0)

print("\n total processing success !!")
