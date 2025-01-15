import React, { useState } from "react";
import "../css/Pages.css";
import "./css/roomReservationStatus .css";

import Sidebar from "../../Components/ReservationSidebar";

const RoomReservationStatus = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="room-reservation-status__header">
          <h1 className="room-reservation-status__title">
            강의실 사용 현황 및 예약 현황
          </h1>
        </header>

        <main className="room-reservation-status__main-content">
          <table className="room-reservation-status__table">
            <thead>
              <tr>
                <th className="room-reservation-status__column"></th>
                <th className="room-reservation-status__column">103호</th>
                <th className="room-reservation-status__column">104호</th>
                <th className="room-reservation-status__column">216호</th>
                <th className="room-reservation-status__column">716호</th>
              </tr>
            </thead>
            <tbody>
              {[
                "9:00",
                "9:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "19:30",
                "20:00",
                "20:30",
                "21:00",
              ].map((time) => (
                <tr key={time}>
                  <th
                    scope="row"
                    className="room-reservation-status__time-slot"
                  >
                    {time}
                  </th>
                  <td className="room-reservation-status__cell"></td>
                  <td className="room-reservation-status__cell"></td>
                  <td className="room-reservation-status__cell"></td>
                  <td className="room-reservation-status__cell"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <footer className="room-reservation-status__footer">
          <button
            className="room-reservation-status__button room-reservation-status__button--cancel"
            onClick={() => {}}
          >
            취소
          </button>
          <button
            className="room-reservation-status__button room-reservation-status__button--edit"
            onClick={() => {}}
          >
            수정
          </button>
        </footer>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default RoomReservationStatus;
