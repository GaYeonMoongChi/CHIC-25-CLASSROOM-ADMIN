const express = require('express');
const router = express.Router();
const { Notice } = require('../db/notice');

// 공지사항 등록 (POST)
router.post('/', async (req, res) => {
    try {
        const { admin_info_id, type, start_date, end_date, title, contents } = req.body;

        // 팝업 게시글일 경우 start_date, end_date 필수 확인
        if (type && (!start_date || !end_date)) {
            return res.status(400).json({ message: '팝업 공지일 경우 시작 및 종료 날짜가 필요합니다.' });
        }

        const newNotice = new Notice({
            admin_info_id,
            type,
            start_date: start_date || null,
            end_date: end_date || null,
            title,
            contents
        });

        await newNotice.save();
        res.status(201).json({ message: '공지사항이 등록되었습니다.', notice: newNotice });
    } catch (error) {
        res.status(500).json({ message: '공지사항 등록 실패', error: error.message });
    }
});

// 공지사항 수정 (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, contents, type, start_date, end_date } = req.body;

        // 공지사항 존재 여부 확인
        const notice = await Notice.findById(id);
        if (!notice) {
            return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
        }

        // 데이터 업데이트
        notice.title = title || notice.title;
        notice.contents = contents || notice.contents;
        notice.type = type !== undefined ? type : notice.type;
        notice.start_date = start_date !== undefined ? start_date : notice.start_date;
        notice.end_date = end_date !== undefined ? end_date : notice.end_date;

        await notice.save();
        res.json({ message: '공지사항이 수정되었습니다.', notice });
    } catch (error) {
        res.status(500).json({ message: '공지사항 수정 실패', error: error.message });
    }
});

// 공지사항 삭제 (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notice = await Notice.findByIdAndDelete(id);

        if (!notice) {
            return res.status(404).json({ message: '삭제할 공지사항을 찾을 수 없습니다.' });
        }

        res.json({ message: '공지사항이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '공지사항 삭제 실패', error: error.message });
    }
});

// 모든 notice_popup 데이터 가져오기(type이 true인 것만)
// GET /api/notice/popup
router.get("/popup", async (req, res) => {
    try {
      const popupNotices = await Notice.find({ type: true }).sort({ created_at: -1 }); // 최신순 정렬
      res.status(200).json(popupNotices);
    } catch (error) {
      res.status(500).json({ message: "팝업 공지사항 조회 실패", error: error.message });
    }
  });
  

// 공지사항 전체 조회 (GET)
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ created_at: -1 }); // 최신순 정렬
        res.json({ notices });
    } catch (error) {
        res.status(500).json({ message: '공지사항 조회 실패', error: error.message });
    }
});

// 공지사항 개별 조회 (GET)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const notice = await Notice.findById(id);

        if (!notice) {
            return res.status(404).json({ message: '공지사항을 찾을 수 없습니다.' });
        }

        res.json({ notice });
    } catch (error) {
        res.status(500).json({ message: '공지사항 조회 실패', error: error.message });
    }
});

module.exports = router;
