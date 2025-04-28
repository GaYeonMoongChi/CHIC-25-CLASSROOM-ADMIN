// routes/pdfUpload.js
// http://localhost:8000/api/upload
// Body : form - data
// Key : Value = pdf(file) : upload file = semester : 0000-0


const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const router = express.Router();

// uploads 대신 temp 폴더 사용
const tempDir = path.join(__dirname, '..', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // temp 폴더에 저장
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '_' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  const semester = req.body.semester;
  const file = req.file;

  if (!semester || !/^\d{4}-\d$/.test(semester)) {
    return res.status(400).json({ error: 'semester 형식은 0000-0 형식이어야 합니다.' });
  }

  if (!file) {
    return res.status(400).json({ error: 'PDF 파일이 필요합니다.' });
  }

  const tempFilePath = path.resolve(file.path); // 파일 경로
  console.log(`PDF 임시 저장 완료: ${tempFilePath}`);

  const scriptDir = path.join(__dirname, '..', 'python');
  const pdfplumberPath = path.join(scriptDir, 'pdf_plumber.py');
  const klasLecturePath = path.join(scriptDir, 'klas_lecture.py');

  const nodeScript1 = path.join(__dirname, '..', 'scripts', 'updateClassTime.js');
  const nodeScript2 = path.join(__dirname, '..', 'scripts', 'updateClassroom.js');

  const PYTHON_CMD = process.platform === "win32" ? "python" : "python3";

  const command = `${PYTHON_CMD} "${pdfplumberPath}" "${tempFilePath}" "${semester}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('PDF 파싱 실패:', error.message);
      fs.unlinkSync(tempFilePath); // 파일 삭제
      return res.status(500).json({ error: 'PDF 파싱 실패', detail: error.message });
    }
    console.log('PDF 파싱 결과:\n', stdout);

    const step2 = `${PYTHON_CMD} "${klasLecturePath}" "${semester}"`;
    const step3 = `node "${nodeScript1}" ${semester}`;
    const step4 = `node "${nodeScript2}" ${semester}`;

    exec(step2, (err2, stdout2) => {
      if (err2) {
        console.error('KLAS 크롤링 실패:', err2.message);
        fs.unlinkSync(tempFilePath);
        return res.status(500).json({ error: 'Klas 크롤링 실패', detail: err2.message });
      }
      console.log('KLAS 크롤링 결과:\n', stdout2);

      exec(step3, (err3, stdout3) => {
        if (err3) {
          console.error('강의 시간 업데이트 실패:', err3.message);
          fs.unlinkSync(tempFilePath);
          return res.status(500).json({ error: '강의 시간 업데이트 실패', detail: err3.message });
        }
        console.log('강의시간 업데이트 결과:\n', stdout3);

        exec(step4, (err4, stdout4) => {
          fs.unlinkSync(tempFilePath); // 모든 과정 끝나고 삭제

          if (err4) {
            console.error('강의실 정보 업데이트 실패:', err4.message);
            return res.status(500).json({ error: '강의실 정보 업데이트 실패', detail: err4.message });
          }
          console.log('강의실 정보 업데이트 결과:\n', stdout4);

          res.json({ message: `{semester} PDF 업로드 및 전체 파이프라인 완료` });
        });
      });
    });
  });
});

module.exports = router;
