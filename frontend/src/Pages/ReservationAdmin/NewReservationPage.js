import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Pages.css";
import "./css/roomReservationStatus.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";

const NewReservationPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 필터링 되는 값들 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchRoom, setSearchRoom] = useState("");

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 건물명 입력 상태 관리
  const [searchBuilding, setBuilding] = useState("");
  const onChangeBuilding = (e) => setBuilding(e.target.value);

  // 강의실 사용 정보 중, 강의실 예약 데이터
  const [reservationsInfo, setReservationsInfo] = useState([]);

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  });

  // 강의실 사용 정보 중, 강의실 예약 데이터 정보만 가져오기

  return (
    <div className="div">
      {/* 헤더 */}
      <header className="room-reservation-status__header">
        <h1 className="room-reservation-status__title">강의실 예약현황 열람</h1>
      </header>

      <div className="room-reservation-status__main">
        {/* 최신 강의실 예약 정보 */}
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 사이드바 */}
      <div className="room-reservation-status__sidebar-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default NewReservationPage;
