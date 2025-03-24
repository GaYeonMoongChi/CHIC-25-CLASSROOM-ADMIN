import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";

const Signup = () => {
  const BACKEND_URL = "http://localhost:8000";
  const navigate = useNavigate();

  // 회원가입 입력 데이터 상태
  const [formData, setFormData] = useState({
    name: "",
    adminType: "",
    email: "",
    password: "",
  });

  // 이메일 인증 관련 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [verificationCode, setVerificationCode] = useState(""); // 사용자가 입력한 인증 코드
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부
  const [errors, setErrors] = useState({}); // 입력 오류 상태

  // 이메일 형식 검증 함수 (kw.ac.kr 도메인만 허용)
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@kw\.ac\.kr$/.test(email);
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 이메일 인증 코드 요청
  const handleEmailVerificationRequest = async () => {
    if (!formData.email || !validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.",
      }));
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/send-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        alert("인증 코드가 이메일로 전송되었습니다.");
        setIsCodeSent(true);
        setErrors((prevErrors) => ({ ...prevErrors, emailServer: "" })); // 서버 오류 메시지 초기화
      } else {
        const data = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailServer: data.message || "이메일 인증 요청 실패",
        }));
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailServer: "서버 오류로 이메일 인증 요청에 실패했습니다.",
      }));
    }
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      if (response.ok) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailVerification: "",
          emailServer: "",
        }));
      } else {
        const data = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          emailServer: data.message || "인증 코드가 올바르지 않습니다.",
        }));
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailServer: "서버 오류로 이메일 인증 요청에 실패했습니다.",
      }));
    }
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.name) newErrors.name = "이름을 입력하세요.";
    if (!formData.adminType) newErrors.adminType = "관리자 유형을 선택하세요.";
    if (!formData.email) newErrors.email = "이메일을 입력하세요.";
    else if (!validateEmail(formData.email))
      newErrors.email = "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.";
    if (!formData.password) newErrors.password = "비밀번호를 입력하세요.";
    if (!isEmailVerified)
      newErrors.emailVerification = "이메일 인증을 완료하세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("입력값을 확인하세요. 모든 항목을 올바르게 입력해야 합니다.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("회원가입 성공!");
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버 오류로 회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signin__wrapper">
      <div className="signin">
        <header className="signin__header">
          <h1 className="signin__title">광운대학교 관리자 페이지 회원가입</h1>
        </header>

        <main className="signin__main">
          <form onSubmit={handleSubmit}>
            {/* 이름 입력 */}
            <div className="signin__input-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="성함을 입력해주세요."
                onChange={handleChange}
              />
            </div>

            <div className="error__block">
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            {/* 관리자 유형 선택 */}
            <div className="signin__input-group">
              <label htmlFor="adminType">관리자 유형</label>
              <select
                name="adminType"
                value={formData.adminType}
                onChange={handleChange}
              >
                <option value="">관리자 유형을 선택하세요.</option>
                <option value="class">강의실예약 / 강의실 / 강의 관리자</option>
                <option value="notice">공지 / 홍보글 관리자</option>
              </select>
            </div>

            <div className="error__block">
              {errors.adminType && <p className="error">{errors.adminType}</p>}
            </div>

            {/* 이메일 입력 및 인증 */}
            <div className="signin__input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="광운대학교 웹메일(@kw.ac.kr)을 입력해주세요."
              />
              <button
                type="button"
                className="verify-email"
                onClick={handleEmailVerificationRequest}
              >
                이메일 인증
              </button>
            </div>

            <div className="error__block">
              {errors.email && <p className="error">{errors.email}</p>}
              {errors.emailVerification && (
                <p className="error">{errors.emailVerification}</p>
              )}
              {errors.emailServer && (
                <p className="error">{errors.emailServer}</p>
              )}
            </div>

            {/* 인증 코드 입력 (이메일 인증 요청 후 표시됨) */}
            {isCodeSent && (
              <div className="signin__input-group">
                <label htmlFor="verificationCode">인증 코드</label>
                <input
                  type="text"
                  name="verificationCode"
                  value={verificationCode}
                  placeholder="광운대학교 웹메일로 전송된 인증번호를 입력해주세요."
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="button" onClick={handleVerifyCode}>
                  인증 확인
                </button>
              </div>
            )}

            {/* 비밀번호 입력 */}
            <div className="signin__input-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="비밀번호를 입력하세요."
                onChange={handleChange}
              />
            </div>

            <div className="error__block">
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* 회원가입 버튼 */}
            <button type="submit" className="signup-btn">
              회원가입
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
