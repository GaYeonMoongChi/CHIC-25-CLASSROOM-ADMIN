import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  const [id, setId] = useState();

  const navigate = useNavigate();

  const login = () => {
    if (id.startsWith("1")) {
      navigate(`/Home/Reservation`);
    } else if (id.startsWith("2")) {
      navigate(`/Home/Notice`);
    } else {
      alert("올바른 관리자 아이디를 입력하세요.");
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login">
      <header className="login__header">
        <h1 className="login__title">예약 현황 관리자 페이지 로그인</h1>
      </header>

      <main className="login__main">
        <label htmlFor="admin-id" className="login__label">
          ID:
        </label>
        <input
          id="admin-id"
          className="login__input"
          type="text"
          placeholder="관리자 아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="login__button" onClick={login}>
          로그인
        </button>
      </main>
    </div>
    </div>
  );
};

export default Login;
