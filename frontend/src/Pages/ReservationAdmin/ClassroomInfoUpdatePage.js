import React, { useState } from "react";
import "../css/Pages.css";
import "./css/classroomInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationSidebar";

const ClassroomInfoUpdatePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="classroom-info-update__header">
          <h1 className="classroom-info-update__title">강의실 정보 업데이트</h1>
          <button className="student-info-update__action-button">등록</button>
          <button className="student-info-update__action-button">삭제</button>
        </header>

        <main className="classroom-info-update__main">
          <table className="classroom-info-update__table">
            <tbody>
              <tr>
                <td className="classroom-info-update__name">103 호</td>
                <td className="classroom-info-update__button">
                  <button
                    id="details-103"
                    className="classroom-info-update__details-button"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="classroom-info-update__name">104 호</td>
                <td className="classroom-info-update__button">
                  <button
                    id="details-104"
                    className="classroom-info-update__details-button"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="classroom-info-update__name">217 호</td>
                <td className="classroom-info-update__button">
                  <button
                    id="details-217"
                    className="classroom-info-update__details-button"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
              <tr>
                <td className="classroom-info-update__name">716 호</td>
                <td className="classroom-info-update__button">
                  <button
                    id="details-716"
                    className="classroom-info-update__details-button"
                  >
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

export default ClassroomInfoUpdatePage;
