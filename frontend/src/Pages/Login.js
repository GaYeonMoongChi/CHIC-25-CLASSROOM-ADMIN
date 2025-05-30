import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const BACKEND_URL = "http://localhost:8000";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    if (!email) {
      setErrorMessage("ID를 입력해주세요.");
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pw }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "로그인에 실패했습니다.");
      }

      // 로컬스토리지에 필요한 데이터 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin_info_id", data.admin_info_id);

      // 관리자 유형에 따라 페이지 이동
      const { type } = data;
      if (type === "class_admin") {
        navigate("/Reservation");
      } else if (type === "ad_admin") {
        navigate("/Notice");
      } else {
        setErrorMessage("잘못된 관리자 유형입니다.");
      }
    } catch (error) {
      setErrorMessage(error.message);
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

            {errorMessage && <p className="login__error">{errorMessage}</p>}

            <div className="login__links">
              <a href="/Find-password" className="password-find">
                비밀번호 찾기
              </a>
              <span className="login__divider">|</span>
              <a href="/signup" className="signup-link">
                회원가입
              </a>
            </div>

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
