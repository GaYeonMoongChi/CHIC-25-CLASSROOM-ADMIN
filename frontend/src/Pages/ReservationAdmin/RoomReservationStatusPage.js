import React, { useState } from "react";
import Timetable from "../../Components/ReservationAdmin/Reservation/TimeTable";
import "../css/Pages.css";
import "./css/roomReservationStatus.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import Calendar from "../../Components/ReservationAdmin/Reservation/Calendar";

// 강의실 예약 데이터
const reservations = [
  {
    roomId: "715호",
    date: "2025-02-03",
    reservation: [
      {
        name: "이민수",
        start_time: "13:00",
        end_time: "15:00",
        purpose: "스터디 모임",
      },
    ],
  },
  {
    roomId: "103호",
    date: "2024-02-03",
    reservation: [
      {
        name: "이민수",
        start_time: "13:00",
        end_time: "15:00",
        purpose: "스터디 모임",
      },
    ],
  },
  {
    roomId: "103호",
    date: "2025-03-04",
    reservation: [
      {
        name: "객체지향프로그래밍",
        start_time: "10:30",
        end_time: "12:00",
        purpose: "김준석",
      },
      {
        name: "컴퓨터그래픽스",
        start_time: "13:30",
        end_time: "15:00",
        purpose: "김동준",
      },
    ],
  },
  {
    roomId: "205호",
    date: "2025-03-04",
    reservation: [
      {
        name: "컴퓨터네트워크",
        start_time: "12:00",
        end_time: "13:30",
        purpose: "박재성",
      },
      {
        name: "컴퓨터네트워크",
        start_time: "15:00",
        end_time: "16:30",
        purpose: "박재성",
      },
      {
        name: "김가연",
        start_time: "17:00",
        end_time: "18:00",
        purpose: "CHIC 개강총회",
      },
    ],
  },
  {
    roomId: "715호",
    date: "2025-03-04",
    reservation: [
      {
        name: "이민수",
        start_time: "18:00",
        end_time: "19:30",
        purpose: "스터디 모임",
      },
    ],
  },
  {
    roomId: "104호",
    date: "2025-03-04",
    reservation: [
      {
        name: "인터랙티브미디어개론",
        start_time: "13:30",
        end_time: "15:00",
        purpose: "김현경",
      },
    ],
  },
];

const RoomReservationStatusPage = () => {
  // 선택된 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchRoom, setSearchRoom] = useState("");

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // TODO: 건물명 검색 기능 추가

  // 강의실 검색 기능
  const searchClassroom = (searchTerm) =>
    ["103", "104", "205", "715"].filter((classroom) =>
      classroom.includes(searchTerm)
    );

  // 검색어 변경 핸들러
  const onChangeRoom = (event) => {
    setSearchRoom(event.target.value);
  };

  // 날짜 및 강의실 검색 필터링
  const filteredReservations = reservations
    .filter((res) => res.date === selectedDate.toISOString().split("T")[0])
    .filter((res) => searchRoom === "" || res.roomId.includes(searchRoom))
    .flatMap((res) =>
      res.reservation.map((item) => ({
        ...item,
        roomId: res.roomId,
      }))
    );

  return (
    <div className="div">
      {/* 헤더 */}
      <header className="room-reservation-status__header">
        <h1 className="room-reservation-status__title">강의실 예약현황 열람</h1>
      </header>

      <div className="room-reservation-status__search">
        <ul className="room-reservation-status__search-list">
          {/* 강의실 검색 */}
          <li className="room-reservation-status__search-item">
            <label className="room-reservation-status__search-label">
              강의실 검색
            </label>
            <input
              type="text"
              className="room-reservation-status__search-input"
              placeholder="강의실 번호를 입력하세요."
              onChange={onChangeRoom}
              value={searchRoom}
            />
          </li>
          {/* 날짜 검색 */}
          <li className="room-reservation-status__search-item">
            <label className="room-reservation-status__search-label">
              날짜 검색
            </label>
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </li>
        </ul>
      </div>

      {/* 타임 테이블*/}
      <div className="room-reservation-status__main">
        <Timetable reservations={filteredReservations} />
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

export default RoomReservationStatusPage;
