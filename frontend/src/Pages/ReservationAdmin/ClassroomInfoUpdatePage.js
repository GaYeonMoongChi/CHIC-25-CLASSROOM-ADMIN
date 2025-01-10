import React, { useState } from "react";
import "./css/Pages.css";
import Sidebar from "../../Components/Sidebar";

const ClassroomInfoUpdatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header id="header" className="header">
          <h1 id="page-title" className="page-title">
            강의실 정보 업데이트
          </h1>
        </header>

        <main id="main" className="main">
          <ul id="classroom-list" className="classroom-list">
            <li className="classroom-item">
              <span className="classroom-name">103</span>
              <button id="details-103" className="details-button">
                상세보기
              </button>
            </li>
            <li className="classroom-item">
              <span className="classroom-name">104</span>
              <button id="details-104" className="details-button">
                상세보기
              </button>
            </li>
            <li className="classroom-item">
              <span className="classroom-name">217</span>
              <button id="details-217" className="details-button">
                상세보기
              </button>
            </li>
            <li className="classroom-item">
              <span className="classroom-name">716</span>
              <button id="details-716" className="details-button">
                상세보기
              </button>
            </li>
          </ul>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default ClassroomInfoUpdatePage;
