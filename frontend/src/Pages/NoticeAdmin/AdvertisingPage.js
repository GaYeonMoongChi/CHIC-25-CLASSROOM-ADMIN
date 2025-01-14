import React, { useState } from "react";
import "../css/Pages.css";
import "./css/advertisingPage.css";
import Sidebar from "../../Components/NoticeSidebar";

const AdvertisingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="advertising-page__header">
          <h1 className="advertising-page__title">홍보/광고</h1>
          <button className="advertising-page__create-button">
            새로운 글 생성
          </button>
        </header>

        <nav className="advertising-page__search-nav">
          <ul className="advertising-page__search-list">
            <li className="advertising-page__search-item">
              작성일
              <input
                type="date"
                className="advertising-page__search-input"
                placeholder="작성일 검색"
              />
            </li>
            <li className="advertising-page__search-item">
              제목
              <input
                type="text"
                className="advertising-page__search-input"
                placeholder="제목 검색"
              />
            </li>
            <li className="advertising-page__search-item">
              적용시작일
              <input
                type="date"
                className="advertising-page__search-input"
                placeholder="적용시작일 검색"
              />
            </li>
            <li className="advertising-page__search-item">
              적용종료일
              <input
                type="date"
                className="advertising-page__search-input"
                placeholder="적용종료일 검색"
              />
            </li>
            <li className="advertising-page__search-item">
              상태
              <form className="advertising-page__status-form">
                <select
                  name="advertising-status"
                  className="advertising-page__status-select"
                >
                  <option value="exposure" selected>
                    적용됨
                  </option>
                  <option value="not-exposure">적용종료</option>
                </select>
              </form>
            </li>
            <li className="advertising-page__search-item">
              작성자
              <input
                type="text"
                className="advertising-page__search-input"
                placeholder="작성자 검색"
              />
            </li>
          </ul>
        </nav>

        <main className="advertising-page__main">
          <table className="advertising-page__table">
            <tbody>
              <tr className="advertising-page__table-row">
                <td className="advertising-page__table-cell">2025년 1월 6일</td>
                <td className="advertising-page__table-cell">
                  2025년 CDP 강의 일정
                </td>
                <td className="advertising-page__table-cell">2025 01 06 ~</td>
                <td className="advertising-page__table-cell">2025 01 31</td>
                <td className="advertising-page__table-cell">관리자</td>
                <td className="advertising-page__table-cell">
                  <button className="advertising-page__detail-button">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr className="advertising-page__table-row">
                <td className="advertising-page__table-cell">2025년 1월 6일</td>
                <td className="advertising-page__table-cell">
                  2025년 CDP 강의 일정
                </td>
                <td className="advertising-page__table-cell">2025 01 06 ~</td>
                <td className="advertising-page__table-cell">2025 01 31</td>
                <td className="advertising-page__table-cell">관리자</td>
                <td className="advertising-page__table-cell">
                  <button className="advertising-page__detail-button">
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

export default AdvertisingPage;
