const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // .env 파일 로드

// MongoDB 연결 함수
const connectDB = async () => {
  try {
    // "student" 데이터베이스 연결
    global.studentDB = mongoose.createConnection(process.env.MONGO_URI_STUDENT);
    console.log('MongoDB (student) 연결 완료');

    // "classroom" 데이터베이스 연결
    global.classDB = mongoose.createConnection(process.env.MONGO_URI_CLASS);
    console.log('MongoDB (class) 연결 완료');

    // "notice" 데이터베이스 연결
    global.noticeDB = mongoose.createConnection(process.env.MONGO_URI_NOTICE);
    console.log('MongoDB (notice) 연결 완료');

    // "manager" 데이터베이스 연결
    global.managerDB = mongoose.createConnection(process.env.MONGO_URI_MANAGER);
    console.log('MongoDB (manager) 연결 완료');


  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    process.exit(1); // 서버 종료
  }
};

// 연결 실행
module.exports = connectDB;
