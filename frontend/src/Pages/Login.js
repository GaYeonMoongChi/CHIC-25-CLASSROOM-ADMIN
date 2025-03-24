import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  // 백엔드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 상태 관리
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 페이지 이동
  const navigate = useNavigate();

  const login = async () => {
    // 예외 처리
    if (!id) {
      setErrorMessage("ID를 입력해주세요.");
      return;
    }
    if (!password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    setErrorMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // JWT 토큰 저장
      localStorage.setItem("token", data.token);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login">
        <header className="login__header">
          <h1 className="login__title">광운대학교 관리자 페이지 로그인</h1>
        </header>

        <main className="login__main">
          <div className="login__form">
            <div className="login__input-group">
              <label className="login__label" htmlFor="admin-id">
                ID:
              </label>
              <input
                id="admin-id"
                className="id__input"
                type="text"
                placeholder="광운대학교 메일을 입력하세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="login__input-group">
              <label className="login__label" htmlFor="admin-password">
                PASSWORD:
              </label>
              <input
                id="admin-password"
                className="password__input"
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p className="login__error">{errorMessage}</p>}

          <div className="login__links">
            <a href="/Find-password" className="login__link">
              비밀번호 찾기
            </a>
            <span className="login__divider">|</span>
            <a href="/signup" className="login__link">
              회원가입
            </a>
          </div>

          <button className="login__button" onClick={login}>
            로그인
          </button>
        </main>
      </div>
    </div>
  );
};

export default Login;
