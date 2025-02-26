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
          {/* 추후 확실한 서비스 이름 정해서 ~서비스 로그인 이런 식으로 적어야겠음 */}
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

          <button className="login__button" onClick={login}>
            로그인
          </button>
        </main>
      </div>
    </div>
  );
};

export default Login;
