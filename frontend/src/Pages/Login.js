import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  // 아이디 입력 상태 관리
  const [id, setId] = useState("");

  // 예외처리 메세지 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // 페이지 이동
  const navigate = useNavigate();

  const login = () => {
    // 예외 처리
    if (!id) {
      setErrorMessage("ID를 입력해주세요.");
      return;
    }
    setErrorMessage("");

    if (id.startsWith("1")) {
      navigate(`/Home/Reservation`);
    } else if (id.startsWith("2")) {
      navigate(`/Home/Notice`);
    } else {
      setErrorMessage("올바른 관리자 아이디를 입력하세요.");
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login">
        <header className="login__header">
          <h1 className="login__title">광운대학교 로그인</h1>
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
