const express = require('express');
const router = express.Router();
const { getClassModel, classDB } = require('../db/class');
const { parseClassDaytime } = require('../utils/classTimeParser');

// 유효한 학기 형식 확인 (예: 2025-1)
function isValidSemester(semester) {
  return /^\d{4}-\d$/.test(semester);
}

// GET /api/class/collections → 유효한 collection 리스트만 반환
router.get('/collections', async (req, res) => {
  try {
    const collections = await classDB.db.listCollections().toArray();
    const valid = collections
      .map(col => col.name)
      .filter(name => /^\d{4}-\d$/.test(name));
    res.json({ message: '컬렉션 목록 조회 성공', collections: valid });
  } catch (err) {
    res.status(500).json({ error: '컬렉션 목록 조회 실패', detail: err.message });
  }
});

// POST /api/class/:semester
// /api/class/2025-1
router.post('/:semester', async (req, res) => {
  const { semester } = req.params;
  if (!isValidSemester(semester)) return res.status(400).json({ error: '학기 형식이 올바르지 않습니다.' });

  try {
    const Class = getClassModel(semester);
    const { class_idx, classroom_idx, class_name, prof_name, class_credit, class_daytime } = req.body;
    if (!class_idx || !class_name || !prof_name || !class_credit || !class_daytime) {
      return res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    }

    const exists = await Class.findOne({ class_idx });
    if (exists) return res.status(400).json({ error: '이미 존재하는 강의입니다.' });

    const timeData = parseClassDaytime(class_daytime);
    const newClass = new Class({ class_idx, classroom_idx, class_name, prof_name, class_credit, class_daytime, ...timeData });
    await newClass.save();

    res.status(201).json({ message: '강의 등록 완료', class: newClass });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '강의 등록 실패', detail: err.message });
  }
});

// GET /api/class/:semester
// GET /api/class/:semester?classroom=103&week=week_mon
router.get('/:semester', async (req, res) => {
  const { semester } = req.params;
  if (!isValidSemester(semester)) return res.status(400).json({ error: '학기 형식이 올바르지 않습니다.' });

  try {
    const Class = getClassModel(semester);
    const { classroom, week } = req.query;

    let query = {};
    if (classroom && week) {
      query = { classroom_idx: classroom, [week]: true };
    }

    const result = await Class.find(query);
    res.json({ message: '강의 조회 성공', classes: result });
  } catch (err) {
    res.status(500).json({ error: '조회 실패', detail: err.message });
  }
});

// PUT /api/class/:semester/:class_idx
router.put('/:semester/:class_idx', async (req, res) => {
  const { semester, class_idx } = req.params;
  if (!isValidSemester(semester)) return res.status(400).json({ error: '학기 형식이 올바르지 않습니다.' });

  try {
    const Class = getClassModel(semester);
    const update = req.body;

    if (update.class_daytime) {
      const timeData = parseClassDaytime(update.class_daytime);
      Object.assign(update, timeData);
    }

    const updated = await Class.findOneAndUpdate({ class_idx }, update, { new: true });
    if (!updated) return res.status(404).json({ error: '해당 강의를 찾을 수 없습니다.' });

    res.json({ message: '강의 수정 완료', class: updated });
  } catch (err) {
    res.status(500).json({ error: '수정 실패', detail: err.message });
  }
});

// DELETE /api/class/:semester/:class_idx
router.delete('/:semester/:class_idx', async (req, res) => {
  const { semester, class_idx } = req.params;
  if (!isValidSemester(semester)) return res.status(400).json({ error: '학기 형식이 올바르지 않습니다.' });

  try {
    const Class = getClassModel(semester);
    const deleted = await Class.findOneAndDelete({ class_idx });
    if (!deleted) return res.status(404).json({ error: '삭제할 강의 없음' });

    res.json({ message: '삭제 성공', class: deleted });
  } catch (err) {
    res.status(500).json({ error: '삭제 실패', detail: err.message });
  }
});

module.exports = router;
