import React, { useState } from "react";
import "../css/Pages.css";
import "./css/studentInfoUpdate .css";

import Sidebar from "../../Components/ReservationSidebar";

const StudentInfoUpdate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="student-info-update__header">
          <h1 className="student-info-update__title">학생 정보 업데이트</h1>
          <button className="student-info-update__action-button">등록</button>
          <button className="student-info-update__action-button">삭제</button>
        </header>

        <main className="student-info-update__main">
          <table className="student-info-update__table">
            <tbody>
              <tr>
                <td className="student-info-update__id">2022123456</td>
                <td className="student-info-update__button">
                  <button className="student-info-update__detail-button">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="student-info-update__id">2022123456</td>
                <td className="student-info-update__button">
                  <button className="student-info-update__detail-button">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="student-info-update__id">2022123456</td>
                <td className="student-info-update__button">
                  <button className="student-info-update__detail-button">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="student-info-update__id">2022123456</td>
                <td className="student-info-update__button">
                  <button className="student-info-update__detail-button">
                    상세보기
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default StudentInfoUpdate;
