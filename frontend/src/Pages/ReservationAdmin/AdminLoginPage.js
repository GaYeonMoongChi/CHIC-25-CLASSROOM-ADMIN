import React from "react";
import "./css/Pages.css";

const AdminLoginPage = () => {
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
        </label>
        <input
          id="admin-id"
          className="input-field"
          type="text"
          placeholder="관리자 아이디 입력"
        />
      </main>

      <footer id="footer" className="footer">
        <button id="login-button" className="action-link">
          로그인
        </button>
      </footer>
    </div>
  );
};

export default AdminLoginPage;
