import React, { useState } from "react";
import "./css/Pages.css";
import Sidebar from "../../Components/Sidebar";

const RoomReservationStatus = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header id="header" className="header">
          <h1 id="page-title" className="page-title">
            강의실 사용 현황 및 예약 현황
          </h1>
        </header>

        <main id="main-content" className="main-content">
          <table id="room-status-table" className="room-status-table">
            <thead>
              <tr>
                <th></th>
                <th id="room-103" className="room-column">
                  103호
                </th>
                <th id="room-104" className="room-column">
                  104호
                </th>
                <th id="room-216" className="room-column">
                  216호
                </th>
                <th id="room-716" className="room-column">
                  716호
                </th>
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
                  <th scope="row" className="time-slot">
                    {time}
                  </th>
                  <td className="room-cell"></td>
                  <td className="room-cell"></td>
                  <td className="room-cell"></td>
                  <td className="room-cell"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <footer id="footer" className="footer">
          <button
            id="cancel-button"
            className="cancel-button"
            onClick={() => {}}
          >
            취소
          </button>
          <button id="edit-button" className="edit-button" onClick={() => {}}>
            수정
          </button>
        </footer>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default RoomReservationStatus;
