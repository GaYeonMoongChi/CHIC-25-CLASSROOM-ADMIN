const mongoose = require('mongoose');
const { classDB } = require('./mongoConnection'); // classDB 연결 가져오기

const classSchema = new mongoose.Schema({
  class_idx: { type: String, required: true, unique: true }, // 강좌 학정 번호
  classroom_idx: { type: String, default: "" }, // 강의실 위치 (초기값 없음)
  class_name: { type: String, required: true }, // 과목명
  prof_name: { type: String, required: true }, // 담당 교수
  class_credit: { type: String, required: true }, // 학점
  class_daytime: { type: String, required: true } // 강의 시간 (예: "월6, 수5")
}, { versionKey: false });

const Class = classDB.model('Class', classSchema, 'class'); // classDB 사용
module.exports = Class;
