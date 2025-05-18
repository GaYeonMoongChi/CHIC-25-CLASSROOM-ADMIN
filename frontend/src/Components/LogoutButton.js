import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css/logoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // 현재 url 경로에 따라 alert창 문구 결정
    const pathname = location.pathname.toLowerCase();
    const isNoticePage = pathname.includes("/notice");
    const pageName = isNoticePage
      ? "[공지 관리자 페이지]"
      : "[강의실 예약 관리자 페이지]";

    const confirmLogout = window.confirm(`${pageName} 로그아웃 하시겠습니까?`);

    if (confirmLogout) {
      // JWT 토큰 삭제
      localStorage.removeItem("token");

      // 로그인 페이지로 리다이렉트
      navigate(`/`);
    }
  };

  return (
    <button id="logout-button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
