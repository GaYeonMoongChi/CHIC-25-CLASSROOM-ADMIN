const mongoose = require('mongoose');
// const { classDB } = require('./mongoConnection'); // classDB 연결 가져오기

const classSchema = new mongoose.Schema({
  class_idx: { type: String, required: true, unique: true }, // 강좌 학정 번호
  classroom_idx: { type: String, default: "" }, // 강의실 위치 (초기값 없음)
  class_name: { type: String, required: true }, // 과목명
  prof_name: { type: String, required: true }, // 담당 교수
  class_credit: { type: String, required: true }, // 학점
  class_daytime: { type: String, required: true }, // 강의 시간 (예: "월6, 수5")

  week_mon: { type: Boolean, default: false },   // 월
  mon_start_time: { type: String, default: "" },
  mon_end_time: { type: String, default: "" },

  week_tue: { type: Boolean, default: false },  // 화
  tue_start_time: { type: String, default: "" },
  tue_end_time: { type: String, default: "" },

  week_wed: { type: Boolean, default: false },  // 수
  wed_start_time: { type: String, default: "" },
  wed_end_time: { type: String, default: "" },

  week_thu: { type: Boolean, default: false }, // 목
  thu_start_time: { type: String, default: "" },
  thu_end_time: { type: String, default: "" },

  week_fri: { type: Boolean, default: false },  // 금
  fri_start_time: { type: String, default: "" },
  fri_end_time: { type: String, default: "" }
}, { versionKey: false });

const timeTable = {
  0: ["08:00", "08:45"], 1: ["09:00", "10:15"], 2: ["10:30", "11:45"],
  3: ["12:00", "13:15"], 4: ["13:30", "14:45"], 5: ["15:00", "16:15"],
  6: ["16:30", "17:45"], 7: ["18:00", "18:45"], 8: ["18:50", "19:35"],
  9: ["19:40", "20:25"], 10: ["20:30", "21:15"], 11: ["21:20", "22:05"]
};

const dayMap = { "월": "mon", "화": "tue", "수": "wed", "목": "thu", "금": "fri" };

function parseClassDaytime(class_daytime) {
  const result = {
    week_mon: false, mon_start_time: "", mon_end_time: "",
    week_tue: false, tue_start_time: "", tue_end_time: "",
    week_wed: false, wed_start_time: "", wed_end_time: "",
    week_thu: false, thu_start_time: "", thu_end_time: "",
    week_fri: false, fri_start_time: "", fri_end_time: ""
  };

  const sessions = class_daytime.split(", ");
  for (const session of sessions) {
    const day = session.charAt(0); // 요일 (월, 화, 수, 목, 금)
    const periodNumbers = session.slice(1).split(",").map(Number); // 교시 (숫자)

    if (day in dayMap) {
      const weekField = `week_${dayMap[day]}`;
      const startField = `${dayMap[day]}_start_time`;
      const endField = `${dayMap[day]}_end_time`;

      result[weekField] = true;
      result[startField] = timeTable[periodNumbers[0]][0]; // 시작 시간
      result[endField] = timeTable[periodNumbers[periodNumbers.length - 1]][1]; // 종료 시간
    }
  }

  return result;
}

const Class = global.classDB.model('Class', classSchema, 'class'); // classDB 사용
module.exports = Class;
