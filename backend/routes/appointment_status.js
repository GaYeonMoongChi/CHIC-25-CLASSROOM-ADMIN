// 예약 현황 
// GET /api/appointment-status/:semester?building=비마관&room=520호&date=2025-04-29

const express = require('express');
const router = express.Router();
const { getClassModel, classDB } = require('../db/class');
const mongoose = require('mongoose');
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();

const studentDB = mongoose.createConnection(process.env.MONGO_URI_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String
}, { collection: 'students', versionKey: false });

const Student = studentDB.model('student', studentSchema);

// 요일 매핑
const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

router.get('/:semester', async (req, res) => {
  try {
    const { semester } = req.params;
    const { building, room, date } = req.query;

    if (!semester || !building || !room || !date) {
      return res.status(400).json({ error: 'semester, building, room, date 파라미터가 필요합니다.' });
    }

    const targetDay = moment(date).day();
    const weekField = `week_${dayMap[targetDay]}`;
    const startField = `${dayMap[targetDay]}_start_time`;
    const endField = `${dayMap[targetDay]}_end_time`;

    const ClassModel = getClassModel(semester);

    // 강의 정보 가져오기
    const classData = await ClassModel.find({
      building,
      room,
      [weekField]: true
    }).select(`class_name prof_name ${startField} ${endField}`);

    const classResult = classData.map(item => ({
      class_name: item.class_name,
      prof_name: item.prof_name,
      start_time: item[startField],
      end_time: item[endField],
      tag: 'class'
    }));

    // 강의실 ID 가져오기
    const classroomInfo = await classDB.collection('classroom_info').findOne({ building, room });
    if (!classroomInfo) {
      return res.json({ message: '조회 성공', results: classResult });
    }

    const reserveList = await classDB.collection('reserve')
      .find({
        classroom_info_id: classroomInfo._id,
        reserve_date: new Date(date)
      }).toArray();

    const reserveResult = await Promise.all(reserveList.map(async (item) => {
      const student = await Student.findOne({ studentId: item.student_id });
      return {
        reserve_start_time: item.reserve_start_time,
        reserve_end_time: item.reserve_end_time,
        purpose: item.purpose,
        name: student ? student.name : '이름없음',
        tag: 'reserve'
      };
    }));

    res.json({ message: '조회 성공', results: [...classResult, ...reserveResult] });
  } catch (error) {
    console.error('예약 현황 조회 실패:', error);
    res.status(500).json({ error: '서버 오류', detail: error.message });
  }
});

module.exports = router;
