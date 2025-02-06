const express = require('express'); // Express 모듈 불러오기
const mongoose = require('mongoose'); // Mongoose 모듈 불러오기
const dotenv = require('dotenv'); // dotenv 모듈 불러오기

dotenv.config(); // .env 파일의 내용을 로드

const app = express(); // Express 애플리케이션 생성
const port = 8000; // 서버 포트 설정

// JSON 데이터 처리를 위한 미들웨어
app.use(express.json());

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB 연결 완료'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// MongoDB 연결 이벤트 리스너 설정
mongoose.connection.on('connected', () => {
  console.log('MongoDB에 성공적으로 연결되었습니다.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 오류:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 연결이 끊어졌습니다.');
});

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다.');
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

const studentRoutes = require('./routes/student'); // student 라우트 불러오기
app.use('/api/students', studentRoutes); // API 경로 등록

