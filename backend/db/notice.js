const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    admin_info_id: { type: String, required: true }, // 관리자 이메일 ID
    created_at: { type: Date, default: Date.now }, // 생성 시간
    type: { type: Boolean, required: true }, // 팝업(1) / 고정 게시글(0) -> true는 1 / false는 0
    start_date: { type: Date, default: null }, // 팝업용 게시글일 경우 시작 날짜 (nullable)
    end_date: { type: Date, default: null }, // 팝업용 게시글일 경우 종료 날짜 (nullable)
    title: { type: String, required: true }, 
    contents: { type: String, required: true } 
}, { versionKey: false });

// notice_popup 스키마 (공지사항 확인한 학생 정보 저장)
const noticePopupSchema = new mongoose.Schema({
    notice_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Notice', required: true }, // Notice 테이블의 _id
    student_id: { type: String, required: true } // 학생 ID
});

// 모델 생성
const Notice = global.noticeDB.model('Notice', noticeSchema);
const NoticePopup = mongoose.model('NoticePopup', noticePopupSchema, 'notice_popup');

module.exports = { Notice, NoticePopup };
