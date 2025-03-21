import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 아이디 상태 관리
  const [id, setId] = useState("");

  // 예외처리 메세지 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // 페이지 이동
  const navigate = useNavigate();

  const login = async () => {
    // 예외 처리
    if (!id) {
      setErrorMessage("ID를 입력해주세요.");
      return;
    }
    setErrorMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "로그인에 실패했습니다.");
      }

      // JWT 토큰 저장
      localStorage.setItem("token", data.token);

      // ID에 따라 페이지 이동
      if (id.startsWith("1")) {
        navigate(`/Home/Reservation`);
      } else if (id.startsWith("2")) {
        navigate(`/Home/Notice`);
      } else {
        setErrorMessage("올바른 관리자 아이디를 입력하세요.");
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
          <h2 className="login__h2">로그인</h2>

          <div className="login__id-input">
            <label htmlFor="admin-id" className="login__label">
              ID:
            </label>
            <input
              id="admin-id"
              className="login__input"
              type="text"
              placeholder="관리자 아이디를 입력하세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          {/* 에러 메세지 ui */}
          {errorMessage && <p className="login__error">{errorMessage}</p>}

          <button className="login__button" onClick={login}>
            로그인
          </button>
        </main>
      </div>
    </div>
  );
};

export default Login;
