const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// 0. MongoDB 연결
mongoose.connect(process.env.MONGO_URI_CLASS, {});

const reserveSchema = new mongoose.Schema({}, { strict: false });
const Reserve = mongoose.model("reserve", reserveSchema, "reserve");

// GET /api/reserve/check
// 1. 모든 예약 목록 조회 (status 관계없이)
// 2. 읽음 처리는 하지 않음 (순수 조회용)
router.get("/check", async (req, res) => {
  try {
    const allReservations = await Reserve.find({});

    console.log("전체 예약 목록 조회 결과:", allReservations); // 콘솔 출력

    res.json({ data: allReservations });
  } catch (error) {
    console.error("전체 예약 목록 조회 실패:", error);
    res.status(500).json({ error: "조회 실패", detail: error.message });
  }
});

// POST /api/reserve/:id/check
// 1. 특정 예약 ID를 전달받아, 해당 예약의 status를 'checked'로 변경
router.post("/:id/check", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Reserve.updateOne(
      { _id: id },
      { $set: { status: "checked" } }
    );

    res.json({
      message: "예약 확인 처리 완료",
      id,
      modified: result.modifiedCount,
    });
  } catch (error) {
    console.error("예약 확인 처리 실패:", error);
    res.status(500).json({ error: "확인 처리 실패", detail: error.message });
  }
});

// POST /api/reserve/check-all
// 1. 모든 'new' 상태 예약을 한 번에 'checked'로 처리
router.post("/check-all", async (req, res) => {
  try {
    const result = await Reserve.updateMany(
      {
        $or: [{ status: { $exists: false } }, { status: "new" }],
      },
      { $set: { status: "checked" } }
    );

    res.json({
      message: `총 ${result.modifiedCount}건 확인 처리 완료`,
      count: result.modifiedCount,
    });
  } catch (error) {
    console.error("새 예약 일괄 확인 실패:", error);
    res.status(500).json({ error: "일괄 확인 실패", detail: error.message });
  }
});

// DELETE /api/reserve/:id
// 특정 예약 ID를 전달받아 해당 예약을 DB에서 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Reserve.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "해당 예약을 찾을 수 없습니다", id });
    }

    res.json({
      message: "예약 삭제 완료",
      id
    });
  } catch (error) {
    console.error("예약 삭제 실패:", error);
    res.status(500).json({ error: "삭제 실패", detail: error.message });
  }
});

module.exports = router;
