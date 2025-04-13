const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const { classDB } = require('./mongoConnection'); // classDB 연결 가져오기

dotenv.config(); // .env 파일 로드

// "class" 데이터베이스 직접 연결
const classDB = mongoose.createConnection(process.env.MONGO_URI_CLASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 연결 확인
classDB.on("connected", () => console.log("MongoDB (class) 연결 완료"));
classDB.on("error", (err) => console.error("MongoDB (class) 연결 실패:", err));

const classSchema = new mongoose.Schema(
  {
    class_idx: { type: String, required: true, unique: true }, // 강좌 학정 번호
    classroom_idx: { type: String, default: "" }, // 강의실 위치 (초기값 없음)
    class_name: { type: String, required: true }, // 과목명
    prof_name: { type: String, required: true }, // 담당 교수
    class_credit: { type: String, required: true }, // 학점
    class_daytime: { type: String, required: false }, // 강의 시간 (예: "월6, 수5")

    week_mon: { type: Boolean, default: false }, // 월
    mon_start_time: { type: String, default: "" },
    mon_end_time: { type: String, default: "" },

    week_tue: { type: Boolean, default: false }, // 화
    tue_start_time: { type: String, default: "" },
    tue_end_time: { type: String, default: "" },

    week_wed: { type: Boolean, default: false }, // 수
    wed_start_time: { type: String, default: "" },
    wed_end_time: { type: String, default: "" },

    week_thu: { type: Boolean, default: false }, // 목
    thu_start_time: { type: String, default: "" },
    thu_end_time: { type: String, default: "" },

    week_fri: { type: Boolean, default: false }, // 금
    fri_start_time: { type: String, default: "" },
    fri_end_time: { type: String, default: "" },
  },
  { versionKey: false }
);

// const Class = global.classDB.model('Class', classSchema, 'class'); // global.classDB 사용
const Class = classDB.model("Class", classSchema, "class"); // classDB 사용

module.exports = Class;
