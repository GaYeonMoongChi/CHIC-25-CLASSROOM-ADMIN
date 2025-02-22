import React, { useState } from "react";
import Timelist from "../../Components/ReservationAdmin/Reservation/Timelist";
import "../css/Pages.css";
import "./css/roomReservationStatus.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";

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
    roomId: "104호",
    date: "2025-02-04",
    reservation: [
      {
        name: "김가연",
        start_time: "15:00",
        end_time: "17:00",
        purpose: "정융 개강총회",
      },
      {
        name: "이민수",
        start_time: "11:00",
        end_time: "11:30",
        purpose: "스터디 모임",
      },
    ],
  },
];

const RoomReservationStatusPage = () => {
  // 선택된 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 선택한 날짜의 예약 데이터 필터링
  const filteredReservations = reservations
    .filter((res) => res.date === selectedDate.toISOString().split("T")[0]) // 날짜 필터
    .flatMap((res) =>
      res.reservation.map((item) => ({
        ...item,
        roomId: res.roomId, // roomId를 개별 예약에 포함
      }))
    );

  return (
    <div>
      {/* 날짜 선택 UI */}
      <div className="date-picker-container">
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      {/* 타임라인 UI */}
      <Timelist reservations={filteredReservations} />

      {/* 사이드바 UI */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default RoomReservationStatusPage;
