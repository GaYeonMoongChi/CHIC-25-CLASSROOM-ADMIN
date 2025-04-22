const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { parseAndSaveClassIdxFromPDF } = require('../utils/pdfParser');

const upload = multer({ dest: 'uploads/' });
// 폐기 예정


// POST /api/pdf-upload/:semester
// http://localhost:8000/api/pdf-upload/2025-1
// Body -> form-data  , key : pdf 입력(file), value : 파일 업로드
router.post('/:semester', upload.single('pdf'), async (req, res) => {
  try {
    const { semester } = req.params;
    const pdfPath = req.file.path;
    const buffer = fs.readFileSync(pdfPath);

    // PDF → 텍스트 변환
    const data = await pdfParse(buffer);
    const text = data.text;

    // 텍스트 → 학정번호 파싱 후 DB 저장
    await parseAndSaveClassIdxFromPDF(text, semester);

    fs.unlinkSync(pdfPath); // 파일 정리
    res.json({ message: 'class_idx 저장 성공!' });
  } catch (error) {
    console.error('PDF 처리 실패:', error);
    res.status(500).json({ error: 'PDF 처리 중 오류 발생', details: error.message });
  }
});

module.exports = router;
