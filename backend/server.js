const express = require("express"); // Express 모듈 불러오기
const mongoose = require("mongoose"); // Mongoose 모듈 불러오기
const dotenv = require("dotenv"); // dotenv 모듈 불러오기
const connectDB = require("./db/mongoConnection"); // MongoDB 연결 함수 불러오기
const cors = require("cors"); // CORS 모듈 불러오기

dotenv.config(); // .env 파일의 내용을 로드

const app = express(); // Express 애플리케이션 생성
const port = 8000; // 서버 포트 설정

// CORS 설정
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// JSON 데이터 처리를 위한 미들웨어
app.use(express.json());

// 기본 라우트 설정
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 실행 중입니다.");
});

// notify 라우트 추가
const { router: notifyRoutes, fetchNotices } = require("./routes/notify");
app.use("/api/notify", notifyRoutes); // 공지사항 API 경로 등록

// MongoDB 연결 실행
connectDB().then(() => {
  // 라우트 등록 (MongoDB 연결 이후에 실행해야 함)
  const studentRoutes = require("./routes/student");
  app.use("/api/students", studentRoutes);

  const classroomRoutes = require("./routes/classroom");
  app.use("/api/classrooms", classroomRoutes);

  const classRoutes = require("./routes/class");
  app.use("/api/class", classRoutes);

  const boardRoutes = require("./routes/board");
  app.use("/api/board", boardRoutes);

  const loginRoutes = require("./routes/login");
  app.use("/api/login", loginRoutes);

  const noticeRoutes = require("./routes/notice");
  app.use("/api/notice", noticeRoutes);

  // 서버 실행
  app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);

    // 초기 크롤링 실행
    (async () => {
      console.log("서버 시작 - 공지사항 초기 크롤링 실행 중...");
      try {
        const notices = await fetchNotices();
        console.log("초기 크롤링 완료:", notices.length, "개");
      } catch (err) {
        console.error("초기 크롤링 오류:", err);
      }
    })();

    // 5초마다 공지사항 자동 업데이트
    setInterval(async () => {
      console.log("공지사항 업데이트 중...");
      try {
        const notices = await fetchNotices();
        console.log("공지사항 업데이트 완료:", notices.length, "개");
      } catch (err) {
        console.error("공지사항 업데이트 오류:", err);
      }
    }, 500);
  });
});
