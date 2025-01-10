import React, { useState } from "react";
import "../css/Pages.css";

import Sidebar from "../../Components/ReservationSidebar";

const StudentInfoUpdate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header id="header" className="header">
          <h1 id="page-title" className="page-title">
            학생 정보 업데이트
          </h1>
          <div id="header-buttons" className="header-buttons">
            <button id="add-button" className="action-button">
              등록
            </button>
            <button id="delete-button" className="action-button">
              삭제
            </button>
            <button id="edit-button" className="action-button">
              수정
            </button>
          </div>
        </header>

        <main id="main" className="main">
          <ul id="student-list" className="student-list">
            <li className="student-item">
              2022123456
              <button className="detail-button">상세보기</button>
            </li>
            <li className="student-item">
              2022123456
              <button className="detail-button">상세보기</button>
            </li>
            <li className="student-item">
              2022123456
              <button className="detail-button">상세보기</button>
            </li>
            <li className="student-item">
              2022123456
              <button className="detail-button">상세보기</button>
            </li>
          </ul>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default StudentInfoUpdate;
