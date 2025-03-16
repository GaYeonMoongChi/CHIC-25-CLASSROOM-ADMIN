const express = require('express');
const router = express.Router();
const Class = require('../db/class'); // Class 모델 불러오기
const { parseClassDaytime } = require('../utils/classTimeParser'); 

// 1. 강의 정보 추가 (POST)
router.post('/', async (req, res) => {
  try {
    console.log('/api/classes POST 요청 받음!', req.body);

    const { class_idx, classroom_idx, class_name, prof_name, class_credit, class_daytime } = req.body;
    if (!class_idx || !class_name || !prof_name || !class_credit || !class_daytime) {
      return res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    }

    const existingClass = await Class.findOne({ class_idx });
    if (existingClass) {
      return res.status(400).json({ error: '이미 존재하는 강의입니다.' });
    }

    // ✅ 강의 시간 변환
    const timeData = parseClassDaytime(class_daytime);

    const newClass = new Class({ 
      class_idx, classroom_idx, class_name, prof_name, class_credit, class_daytime,
      ...timeData
    });

    await newClass.save();
    res.status(201).json({ message: '강의가 추가되었습니다.', class: newClass });
  } catch (error) {
    console.error('강의 추가 실패:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 2. 강의 정보 수정 (PUT)
router.put('/:class_idx', async (req, res) => {
  try {
    console.log(`/api/classes/${req.params.class_idx} PUT 요청 받음`, req.body);

    const { class_idx } = req.params;
    const { classroom_idx, class_name, prof_name, class_credit, class_daytime } = req.body;

    const existingClass = await Class.findOne({ class_idx });
    if (!existingClass) {
      return res.status(404).json({ error: '강의 정보를 찾을 수 없습니다.' });
    }

    if (class_daytime !== undefined) {
      const timeData = parseClassDaytime(class_daytime);
      Object.assign(existingClass, timeData);
    }

    if (classroom_idx !== undefined) existingClass.classroom_idx = classroom_idx;
    if (class_name !== undefined) existingClass.class_name = class_name;
    if (prof_name !== undefined) existingClass.prof_name = prof_name;
    if (class_credit !== undefined) existingClass.class_credit = class_credit;
    if (class_daytime !== undefined) existingClass.class_daytime = class_daytime;

    await existingClass.save();
    res.json({ message: '강의 정보가 수정되었습니다.', class: existingClass });
  } catch (error) {
    console.error('강의 정보 수정 실패:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 3. 강의 정보 삭제 (DELETE)
router.delete('/:class_idx', async (req, res) => {
  try {
    console.log(`/api/classes/${req.params.class_idx} DELETE 요청 받음`);

    const { class_idx } = req.params;

    // 강의 존재 여부 확인
    const existingClass = await Class.findOne({ class_idx });
    if (!existingClass) {
      return res.status(404).json({ error: '삭제할 강의 정보를 찾을 수 없습니다.' });
    }

    await Class.deleteOne({ class_idx });

    res.json({ message: '강의 정보가 삭제되었습니다.', class: existingClass });
  } catch (error) {
    console.error('강의 삭제 실패:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
