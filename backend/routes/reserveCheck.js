// routes/reserve.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI_CLASS, {
});

const reserveSchema = new mongoose.Schema({}, { strict: false });
const Reserve = mongoose.model('reserve', reserveSchema, 'reserve');

// GET /api/reserve/check
// 새 예약창에서 호출 → new로 간주된 예약들을 조회하고, status를 checked로 업데이트
router.get('/check', async (req, res) => {
  try {
    // 1. status 필드가 없거나 'new'로 간주되는 예약들을 찾음
    const unchecked = await Reserve.find({
      $or: [
        { status: { $exists: false } },
        { status: 'new' }
      ]
    });

    // 2. 해당 예약들의 status를 모두 'checked'로 업데이트
    const ids = unchecked.map(doc => doc._id);
    if (ids.length > 0) {
      await Reserve.updateMany(
        { _id: { $in: ids } },
        { $set: { status: 'checked' } }
      );
    }

    // 3. 클라이언트에 응답
    res.json({
      message: `새 예약 ${ids.length}건 확인 완료`,
      count: ids.length,
      data: unchecked.map(doc => ({
        ...doc.toObject(),
        status: 'new' // 프론트에서 처음 본 것이므로 new로 표시
      }))
    });
  } catch (error) {
    console.error('새 예약 조회 실패:', error);
    res.status(500).json({ error: '조회 실패', detail: error.message });
  }
});

module.exports = router;
