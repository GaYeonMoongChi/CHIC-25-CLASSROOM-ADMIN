const mongoose = require('mongoose');
const { noticeDB } = require('./mongoConnection'); // ✅ noticeDB 가져오기

const noticeSchema = new mongoose.Schema({
  notice_idx: { type: String, required: true, unique: true }, // 홍보물 ID
  account_idx: { type: String, required: true }, // 작성자 ID
  title: { type: String, required: true }, // 제목
  contents: { type: String }, // 내용 (첨부파일 가능)
  file_url: { type: String }, // 업로드된 파일 URL
  createdAt: { type: Date, default: Date.now }, // 생성 시간
  updatedAt: { type: Date, default: Date.now }, // 수정 시간
  endtime: { type: Date }, // 종료 시간 (있으면 비활성화)
  views: { type: Number, default: 0 } // 조회수
}, { versionKey: false });

const Notice = noticeDB.model('Notice', noticeSchema, 'board'); // ✅ `board` 컬렉션에 저장
module.exports = Notice;
