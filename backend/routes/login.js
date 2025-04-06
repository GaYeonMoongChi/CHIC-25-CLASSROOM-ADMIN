const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Manager = require("../db/manager"); // 사용자 모델 추가

dotenv.config();

// 이메일 인증 코드 저장 (key: email, value: { code, expiresAt })
const emailVerificationStore = new Map();

// Gmail SMTP 설정
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// 1. 이메일 인증 요청 (POST) - 인증 코드 발송
// POST /api/login/send-code
// {
//  "email": "test@kw.ac.kr"
// }
router.post("/send-code", async (req, res) => {
  try {
    console.log("/api/login/send-code POST 요청 받음!", req.body);

    const { email } = req.body;

    // 이메일이 `@kw.ac.kr` 도메인인지 확인
    if (!email.endsWith("@kw.ac.kr")) {
      return res
        .status(400)
        .json({ error: "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다." });
    }

    // 중복 이메일 검사
    const existingUser = await Manager.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다." });
    }

    // 6자리 랜덤 인증 코드 생성
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const expiresAt = Date.now() + 3 * 60 * 1000; // 유효 시간: 3분

    // 인증 코드 저장
    emailVerificationStore.set(email, { code: verificationCode, expiresAt });

    // 이메일 발송
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "[광운대학교 강의실 예약 시스템] 이메일 인증",
      html: `<p>인증번호: <strong style="color:blue; font-size:18px;">${verificationCode}</strong></p>
             <p>유효 시간: 3분</p>`,
    };

    await smtpTransport.sendMail(mailOptions);
    console.log(`인증 코드 전송 완료: ${email} → ${verificationCode}`);

    res.json({ message: "인증 코드가 전송되었습니다.", email });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    res.status(500).json({ error: "이메일 전송에 실패했습니다." });
  }
});

// 2. 이메일 인증 코드 검증 (POST) - 사용자가 입력한 코드 확인
// POST /api/login/verify-code
// {
// "email": "test@kw.ac.kr",
//  "code": "123456"
// }
router.post("/verify-code", async (req, res) => {
  try {
    console.log("/api/login/verify-code POST 요청 받음!", req.body);

    const { email, code } = req.body;
    const storedData = emailVerificationStore.get(email);

    // 저장된 인증 코드가 없는 경우
    if (!storedData) {
      return res
        .status(400)
        .json({ error: "인증 코드가 만료되었거나 요청되지 않았습니다." });
    }

    const { code: storedCode, expiresAt } = storedData;

    // 인증 코드 유효 시간 확인
    if (Date.now() > expiresAt) {
      emailVerificationStore.delete(email);
      return res
        .status(400)
        .json({ error: "인증 코드가 만료되었습니다. 다시 요청해주세요." });
    }

    // 입력한 코드와 저장된 코드 비교
    if (code !== storedCode) {
      return res.status(400).json({ error: "인증 코드가 일치하지 않습니다." });
    }

    // 인증 성공 후, 저장소에서 삭제
    emailVerificationStore.delete(email);
    console.log(`인증 성공: ${email}`);

    res.json({ message: "이메일 인증이 완료되었습니다.", email });
  } catch (error) {
    console.error("이메일 인증 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 관리자 계정 생성 API (회원가입) http://localhost:8000/api/login/manager/register
// {
//  "name": "정유빈",
//  "email": "dbqls8969@kw.ac.kr",
//  "pw": "qwer"
// }

router.post("/manager/register", async (req, res) => {
  try {
    console.log("/api/manager/register POST 요청 받음!", req.body);

    const { name, email, pw, type } = req.body;

    // 필수 값 확인
    if (!name || !email || !pw || !type) {
      return res.status(400).json({ error: "모든 필드를 입력해야 합니다." });
    }

    // type 값이 올바른지 검증
    if (!["class_admin", "ad_admin"].includes(type)) {
      return res
        .status(400)
        .json({ error: "유효한 관리자 유형을 선택하세요." });
    }

    // 이메일 중복 확인
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ error: "이미 등록된 이메일입니다." });
    }

    // 새로운 관리자 저장
    const newManager = new Manager({ name, email, pw, type });
    await newManager.save();

    res
      .status(201)
      .json({ message: "관리자 등록 완료", manager: { name, email, type } });
  } catch (error) {
    console.error("관리자 등록 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 관리자 로그인 API (POST /api/login)
router.post("/", async (req, res) => {
  try {
    console.log("/api/login POST 요청 받음!", req.body);

    const { email, pw } = req.body;

    // 필수 값 확인
    if (!email || !pw) {
      return res.status(400).json({ error: "이메일과 비밀번호를 입력하세요." });
    }

    // 관리자 계정 조회
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res
        .status(401)
        .json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // 비밀번호 검증
    const isMatch = await bcrypt.compare(pw, manager.pw);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // JWT 토큰 생성 (유효기간: 1시간)
    const token = jwt.sign(
      {
        id: manager._id,
        email: manager.email,
        name: manager.name,
        type: manager.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`로그인 성공: ${email}`);
    res.json({
      message: "로그인 성공",
      token,
      admin_info_id: manager._id,
      type: manager.type,
    });
  } catch (error) {
    console.error("로그인 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

/*
const auth = require('../middleware/auth');
  router.get('/admin-only', auth, (req, res) => {
  res.json({ message: `안녕하세요, ${req.user.name} 관리자님!` });
});*/

module.exports = router;
