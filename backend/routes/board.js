const express = require('express');
const multer = require('multer'); // 파일 업로드용
const path = require('path');
const fs = require('fs');
const router = express.Router();
const Notice = require('../db/notice');

// 파일 저장 경로 설정
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // uploads 폴더에 저장
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // 고유 파일명
  }
});

const upload = multer({ storage });

// 1. 홍보물 생성 (POST) - 파일 업로드 포함
// post > http://localhost:8000/api/board
router.post('/', upload.single('file'), async (req, res) => {
    try {
      console.log('/api/board POST 요청 받음!', req.body, req.file);
  
      const { notice_idx, account_idx, title, contents, endtime } = req.body;
      const file_url = req.file ? `/uploads/${req.file.filename}` : '';
  
      if (!notice_idx || !account_idx || !title) {
        return res.status(400).json({ error: '필수 입력값이 없습니다.' });
      }
  
      const newNotice = new Notice({
        notice_idx,
        account_idx,
        title,
        contents,
        file_url,
        endtime
      });
  
      await newNotice.save();
  
      res.status(201).json({ message: '홍보물이 추가되었습니다.', notice: newNotice });
    } catch (error) {
      console.error('홍보물 추가 실패:', error);
      res.status(500).json({ error: '서버 오류' });
    }
});

// 2. 홍보물 조회 (GET)
// Get > ex) http://localhost:8000/api/board/1001
router.get('/:notice_idx', async (req, res) => {
    try {
      console.log(`/api/board/${req.params.notice_idx} GET 요청 받음!`);
  
      const notice = await Notice.findOne({ notice_idx: req.params.notice_idx });
  
      if (!notice) {
        return res.status(404).json({ error: '홍보물을 찾을 수 없습니다.' });
      }
  
      // 조회수 증가
      notice.views += 1;
      await notice.save();
  
      res.json({ message: '홍보물 조회 성공', notice });
    } catch (error) {
      console.error('홍보물 조회 실패:', error);
      res.status(500).json({ error: '서버 오류' });
    }
});

// 3. 홍보물 삭제 (DELETE)
// Delete > ex) http://localhost:8000/api/board/1001
router.delete('/:notice_idx', async (req, res) => {
    try {
      console.log(`/api/board/${req.params.notice_idx} DELETE 요청 받음!`);
  
      const notice = await Notice.findOne({ notice_idx: req.params.notice_idx });
  
      if (!notice) {
        return res.status(404).json({ error: '삭제할 홍보물을 찾을 수 없습니다.' });
      }
  
      // 파일이 있으면 삭제
      if (notice.file_url) {
        const filePath = path.join(__dirname, '..', notice.file_url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
  
      await Notice.deleteOne({ notice_idx: req.params.notice_idx });
  
      res.json({ message: '홍보물이 삭제되었습니다.', notice });
    } catch (error) {
      console.error('홍보물 삭제 실패:', error);
      res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router;
