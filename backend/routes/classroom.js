const express = require('express');
const router = express.Router();
const Classroom = require('../db/classroom'); // Classroom 모델 가져오기

// 강의실 정보 추가 (POST) -> http://localhost:8000/api/classrooms
router.post('/', async (req, res) => {
  console.log("/api/classrooms POST 요청 받음!", req.body);

  const { classroom_idx, classroom_name, classroom_exp } = req.body;

  try {
    // 필수 필드 확인
    if (!classroom_idx || !classroom_name || !classroom_exp) {
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
    }

    // 기존 강의실 중복 확인
    const existingClassroom = await Classroom.findOne({ classroom_idx });
    if (existingClassroom) {
      return res.status(409).json({ message: "이미 존재하는 강의실입니다." });
    }

    // 새 강의실 생성
    const newClassroom = new Classroom({ classroom_idx, classroom_name, classroom_exp });
    await newClassroom.save();
    console.log("강의실 추가 완료:", newClassroom);

    res.status(201).json({ message: "강의실이 추가되었습니다.", classroom: newClassroom });
  } catch (err) {
    console.error("강의실 추가 실패:", err);
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
});

module.exports = router;
