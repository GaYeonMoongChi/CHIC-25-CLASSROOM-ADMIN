import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signin.css";

const Signup = () => {
  // 백엔드 API 주소
  const BACKEND_URL = "http://localhost:8000";
  const navigate = useNavigate();

  // 입력 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    adminType: "",
    email: "",
    password: "",
  });

  // 입력값 검증 오류 상태 관리
  const [errors, setErrors] = useState({});

  // 이메일 형식 검증 함수 (kw.ac.kr 도메인만 허용)
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@kw\.ac\.kr$/.test(email);
  };

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값 유효성 검사
    let newErrors = {};
    if (!formData.name) newErrors.name = "이름을 입력하세요.";
    if (!formData.adminType) newErrors.adminType = "관리자 유형을 선택하세요.";
    if (!formData.email) newErrors.email = "이메일을 입력하세요.";
    else if (!validateEmail(formData.email))
      newErrors.email = "광운대학교 이메일(@kw.ac.kr)만 사용 가능합니다.";
    if (!formData.password) newErrors.password = "관리자 번호를 입력하세요.";

    // 오류가 있으면 상태 업데이트 후 중단
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 회원가입 요청 보내기
    try {
      const response = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 응답 처리
      if (response.ok) {
        alert("회원가입 성공!");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        const data = await response.json();
        alert(data.message || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className="signin__wrapper">
      <div className="signin">
        <header className="signin__header">
          <h1 className="signin__title">광운대학교 관리자 페이지 회원가입</h1>
        </header>
        <main className="signin__main">
          <h2 className="signin__h2">회원가입</h2>
          <form onSubmit={handleSubmit}>
            {/* 이름 입력 필드 */}
            <div className="signin__input-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
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
                <option value="">선택하세요</option>
                <option value="super">슈퍼 관리자</option>
                <option value="editor">편집 관리자</option>
              </select>
              {errors.adminType && <p className="error">{errors.adminType}</p>}
            </div>
            {/* 이메일 입력 필드 */}
            <div className="signin__input-group">
              <label htmlFor="email">이메일</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <button type="button" className="verify-email">
                이메일 인증
              </button>
            </div>
            {/* 관리자 번호 입력 필드 */}
            <div className="signin__input-group">
              <label htmlFor="password">관리자 번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
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
