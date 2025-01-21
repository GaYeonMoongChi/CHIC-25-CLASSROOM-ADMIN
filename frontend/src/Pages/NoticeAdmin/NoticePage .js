import "../css/Pages.css";
import "./css/noticePage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import React, { useState } from "react";

const NoticePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="notice-page__header">
          <h1 className="notice-page__title">공지사항</h1>
          <button className="notice-page__action-button">등록</button>
          <button className="notice-page__action-button">삭제</button>{" "}
        </header>

        <nav className="notice-page__search-nav">
          <ul className="notice-page__search-list">
            <li className="notice-page__search-item">
              <label
                htmlFor="search-date"
                className="notice-page__search-label"
              >
                작성일
              </label>
              <input
                type="date"
                id="search-date"
                name="search"
                className="notice-page__search-input"
                placeholder="작성일 검색"
              />
            </li>
            <li className="notice-page__search-item">
              <label
                htmlFor="search-title"
                className="notice-page__search-label"
              >
                제목
              </label>
              <input
                type="text"
                id="search-title"
                name="search"
                className="notice-page__search-input"
                placeholder="제목 검색"
              />
            </li>
            <li className="notice-page__search-item">
              <label
                htmlFor="search-author"
                className="notice-page__search-label"
              >
                작성자
              </label>
              <input
                type="text"
                id="search-author"
                name="search"
                className="notice-page__search-input"
                placeholder="작성자 검색"
              />
            </li>
          </ul>
        </nav>

        <main className="notice-page__main">
          <table className="notice-page__table">
            <tbody>
              <tr className="notice-page__row">
                <td className="notice-page__table-cell">2025년 1월 6일</td>
                <td className="notice-page__table-cell">
                  2025년 1학기 학사 일정
                </td>
                <td className="notice-page__table-cell">관리자</td>
                <td className="notice-page__table-cell">
                  <button className="notice-page__details-button">
                    상세보기
                  </button>
                </td>
              </tr>
              <tr className="notice-page__row">
                <td className="notice-page__table-cell">2025년 1월 6일</td>
                <td className="notice-page__table-cell">
                  2025년 1학기 학사 일정
                </td>
                <td className="notice-page__table-cell">관리자</td>
                <td className="notice-page__table-cell">
                  <button className="notice-page__details-button">
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

export default NoticePage;
