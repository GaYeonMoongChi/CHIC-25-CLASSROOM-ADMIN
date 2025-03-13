const mongoose = require('mongoose');
// const { classDB } = require('./mongoConnection'); // classDB 연결 가져오기

const classroomSchema = new mongoose.Schema({
  classroom_idx: { type: String, required: true, unique: true }, // 강의실 위치(호수)
  classroom_name: { type: String, required: true }, // 강의실 이름
  classroom_exp: { type: String, required: true } // 강의실 설명
}, { versionKey: false }); // __v 필드 제거

// "classroom" 컬렉션을 사용하도록 설정
const Classroom = global.classDB.model('Classroom', classroomSchema, 'classroom');
module.exports = Classroom;
