import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 이메일 유효성 검사
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@kw\.ac\.kr$/.test(email);

  const login = async () => {
    if (!email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("광운대학교 이메일(@kw.ac.kr)만 사용할 수 있습니다.");
      return;
    }
    if (!pw) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pw }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // 로컬스토리지에 필요한 데이터 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin_info_id", data.admin_info_id);

      // 로그인 성공 시 관리자 홈으로 이동
      navigate("/reservation");
    } catch (error) {
      setErrorMessage(error.message || "서버 오류로 로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login">
        <header className="login__header">
          <h1 className="login__title">[광운대학교 관리자 페이지] 로그인</h1>
        </header>

        <main className="login__main">
          <form
            className="login__form"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            {/* 이메일 입력 */}
            <div className="login__input-group">
              <label className="login__label" htmlFor="admin-id">
                이메일
              </label>
              <input
                id="admin-id"
                className="id__input"
                type="text"
                placeholder="광운대학교 메일을 입력하세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="login__input-group">
              <label className="login__label" htmlFor="admin-password">
                비밀번호
              </label>
              <input
                id="admin-password"
                className="password__input"
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={pw}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 오류 메시지 표시 */}
            {errorMessage && <p className="login__error">{errorMessage}</p>}

            {/* 링크 */}
            <div className="login__links">
              <a href="/find-password" className="password-find">
                비밀번호 찾기
              </a>
              <span className="login__divider">|</span>
              <a href="/signup" className="signup-link">
                회원가입
              </a>
            </div>

            {/* 로그인 버튼 */}
            <button className="login__button" type="submit">
              로그인
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
