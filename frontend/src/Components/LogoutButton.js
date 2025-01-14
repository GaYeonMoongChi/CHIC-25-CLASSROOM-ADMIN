import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(`/`);
  };

  return (
    <button id="logout-button" onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
