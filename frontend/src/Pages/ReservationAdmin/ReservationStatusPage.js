import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timetable from "../../Components/ReservationAdmin/Reservation/TimeTable";
import "../css/Pages.css";
import "./css/roomReservationStatus.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import NewReservation from "../../Components/ReservationAdmin/Reservation/NewReservation";
import LogoutButton from "../../Components/LogoutButton";

const RoomReservationStatusPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 필터링 되는 값들 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchRoom, setSearchRoom] = useState("");
  const [searchBuilding, setBuilding] = useState("");
  const onChangeBuilding = (e) => setBuilding(e.target.value);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 새 예약 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 강의실 사용 정보 데이터
  const [reservationsInfo, setReservationsInfo] = useState([]);

  // 검색어 변경 핸들러
  const onChangeRoom = (event) => {
    setSearchRoom(event.target.value);
  };

  // 날짜 및 강의실 검색 필터링
  const filteredReservations = reservationsInfo
    .filter((res) => res.date === selectedDate.toISOString().split("T")[0])
    .filter((res) => searchRoom === "" || res.roomId.includes(searchRoom))
    .flatMap((res) =>
      res.reservation.map((item) => ({
        ...item,
        roomId: res.roomId,
      }))
    );

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="div">
      {/* 헤더 */}
      <div className="reservation-status__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="reservation-status__title">강의실 예약현황</h1>
        <div className="reservation-status__nav">
          {/* TODO: 새 예약이 몇 개 있는지 수도 표시하면 좋을 듯. or 새 예약이 있으면 점으로만 표시*/}
          <button onClick={openModal}>
            새 예약 <span>5</span>
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="reservation-status__search">
        <ul className="reservation-status__search-list">
          <li className="reservation-status__search-item">
            <label
              htmlFor="search-author"
              className="reservation-status__search-label"
            >
              건물명
            </label>
            <input
              type="text"
              name="search"
              className="reservation-status__search-input"
              placeholder="건물명으로 검색하세요."
              onChange={onChangeBuilding}
              value={searchBuilding}
            />
          </li>
          <li className="reservation-status__search-item">
            <label className="reservation-status__search-label">호수</label>
            <input
              type="text"
              className="reservation-status__search-input"
              placeholder="강의실 호수를 입력하세요."
              onChange={onChangeRoom}
              value={searchRoom}
            />
          </li>
          <li className="reservation-status__search-item">
            <label className="reservation-status__search-label">날짜</label>
            <input type="date" className="reservation-status__search-input" />
          </li>
        </ul>
      </div>

      {/* 타임 테이블*/}
      <div className="reservation-status__main">
        <Timetable reservations={filteredReservations} />
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {isModalOpen && <NewReservation onClose={closeModal} />}
    </div>
  );
};

export default RoomReservationStatusPage;
