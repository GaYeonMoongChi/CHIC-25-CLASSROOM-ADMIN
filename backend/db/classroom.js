const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    building: { type: String, required: true }, // 건물명
    room: { type: String, required: true }, // 호수(번호)
    equipment: { type: [String], default: [] }, // 장비 목록 (배열)
    minNumberOfUsers: { type: String, default: null }, // 최소 사용자 수 (기본 null)
    contactDepartment: { type: String, required: true }, // 담당 부서
    contactLocation: { type: String, required: true }, // 담당 부서 위치
    contactNumber: { type: String, required: true } // 담당 부서 연락처
}, { versionKey: false });

const Classroom = global.classDB.model('Classroom', classroomSchema, 'classroom_info');

module.exports = Classroom;
