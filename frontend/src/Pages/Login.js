import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 백엔드 주소
  const BACKEND_URL = "http://localhost:8000";

  const navigate = useNavigate();

  // 상태 관리
  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    // 예외 처리
    if (!email) {
      setErrorMessage("ID를 입력해주세요.");
      return;
    }
    if (!pw) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }
    setErrorMessage("");

    // 로그인 요청
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, pw: pw }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // JWT 토큰 저장
      localStorage.setItem("token", data.token);

      // 로그인 요청
      try {
        const response = await fetch(`${BACKEND_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, pw: pw }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "로그인에 실패했습니다.");
        }

        // JWT 토큰 저장
        localStorage.setItem("token", data.token);

        // 관리자 type에 따라 다른 페이지로 이동
        const { type } = data;
        console.log(type);

        if (type === "class_admin") {
          navigate(`/Classroom`); // 강의실 관리자로 이동
        } else if (type === "ad_admin") {
          navigate("/Notice"); // 공지사항 관리자 페이지로 이동
        } else {
          setErrorMessage("잘못된 관리자 유형입니다.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={pw}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="login__error">
              {errorMessage} 로그인에 실패했습니다.
            </p>
          )}

          <div className="login__links">
            <a href="/Find-password" className="password-find">
              비밀번호 찾기
            </a>
            <span className="login__divider">|</span>
            <a href="/signup" className="signup-link">
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
