import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/logoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // JWT 토큰 삭제
    localStorage.removeItem("token");

    // 로그인 페이지로 리다이렉트
    navigate(`/`);
  };

  return (
    <button id="logout-button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
