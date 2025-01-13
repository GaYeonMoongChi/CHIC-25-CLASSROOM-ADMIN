import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Pages.css";

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
    <div className="div">
      <header id="header" className="header">
        <h1 id="page-title" className="page-title">
          예약 현황 관리자 페이지 로그인
        </h1>
      </header>

      <main id="main" className="main">
        <label htmlFor="admin-id" className="input-label">
          ID:
          <input
            id="admin-id"
            className="input-field"
            type="text"
            placeholder="관리자 아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <button id="login-button" className="action-link" onClick={login}>
          로그인
        </button>
      </main>
    </div>
  );
};

export default Login;
