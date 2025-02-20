const express = require('express');
const router = express.Router();
const Student = require('../db/student');

// 모든 학생 정보 가져오기
router.get('/', async (req, res) => {
    try {
      const students = await Student.find(); // DB에서 모든 학생 조회
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: '서버 오류', error: err.message });
    }
  });


// 학생 정보 추가하기 (POST)
router.post('/', async (req, res) => {
    console.log("/api/students POST 요청 받음!", req.body);
    
    const { id, name, phone } = req.body;
  
    // 입력값 검증
    if (!id || !name || !phone) {
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
    }
    if (!/^\d{10}$/.test(id)) {
      return res.status(400).json({ message: "ID는 10자리 숫자로 입력해야 합니다." });
    }
    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
      return res.status(400).json({ message: "전화번호는 010-0000-0000 형식이어야 합니다." });
    }
  
    try {
      // 중복 ID 확인
      const existingStudent = await Student.findOne({ id });
      if (existingStudent) {
        return res.status(400).json({ message: "이미 존재하는 ID입니다." });
      }
  
      // 학생 추가
      const newStudent = new Student({ id, name, phone });
      await newStudent.save();
      
      console.log("학생 추가 성공:", newStudent);
      res.status(201).json(newStudent);
    } catch (err) {
      console.error("학생 추가 실패:", err);
      res.status(500).json({ message: '서버 오류', error: err.message });
    }
  });

  // 학생 정보 수정 (PUT)  -> 요청 URL : http://localhost:8000/api/students/2020202020
router.put('/:id', async (req, res) => {
    console.log("/api/students/:id PUT 요청 받음!", req.params.id, req.body);
    
    const { id } = req.params;
    const { name, phone } = req.body;
  
    try {
      // 해당 ID의 학생이 존재하는지 확인
      const student = await Student.findOne({ id });
      if (!student) {
        return res.status(404).json({ message: "학생 정보를 찾을 수 없습니다." });
      }
  
      // 입력값 검증 및 수정
      if (name !== undefined) student.name = name; // 이름 변경
      if (phone !== undefined) {
        if (!/^010-\d{4}-\d{4}$/.test(phone)) {
          return res.status(400).json({ message: "전화번호는 010-0000-0000 형식이어야 합니다." });
        }
        student.phone = phone; // 전화번호 변경
      }
  
      // 변경 사항 저장
      await student.save();
      console.log("학생 정보 수정 완료:", student);
  
      res.json({ message: "학생 정보가 수정되었습니다.", student });
    } catch (err) {
      console.error("학생 정보 수정 실패:", err);
      res.status(500).json({ message: '서버 오류', error: err.message });
    }
  });


  // 여러 학생 정보 삭제 (DELETE) -> 요청 URL : http://localhost:8000/api/students
  // 배열로 삭제
router.delete('/', async (req, res) => {
  try {
    console.log("/api/students DELETE 요청 받음!", req.body);

    const { ids } = req.body;

    // 요청 검증: 삭제할 ID가 있는지 확인
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "삭제할 학생 ID 목록이 필요합니다." });
    }

    // 해당 ID의 학생이 존재하는지 확인
    const existingStudents = await Student.find({ id: { $in: ids } });

    if (existingStudents.length === 0) {
      return res.status(404).json({ error: "삭제할 학생 정보를 찾을 수 없습니다." });
    }

    // 학생 정보 삭제
    await Student.deleteMany({ id: { $in: ids } });

    console.log("학생 정보 삭제 완료:", ids);

    res.json({
      message: "학생 정보가 삭제되었습니다.",
      deleted_students: ids
    });
  } catch (err) {
    console.error("학생 정보 삭제 실패:", err);
    res.status(500).json({ error: '서버 오류' });
  }
});


module.exports = router;