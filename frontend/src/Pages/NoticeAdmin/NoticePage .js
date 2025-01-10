import React from "react";

const NoticePage = () => {
  return (
    <div className="div">
      <header id="header">
        <span className="page-title">공지사항</span>
        <button id="create-button" className="action-button">
          새로운 글 생성
        </button>
      </header>

      <nav id="search-nav">
        <ul className="search-list">
          <li className="search-item">
            <label htmlFor="search-date" className="search-label">
              작성일
            </label>
            <input
              type="date"
              id="search-date"
              name="search"
              className="search-input"
              placeholder="작성일 검색"
            />
          </li>
          <li className="search-item">
            <label htmlFor="search-title" className="search-label">
              제목
            </label>
            <input
              type="text"
              id="search-title"
              name="search"
              className="search-input"
              placeholder="제목 검색"
            />
          </li>
          <li className="search-item">
            <label htmlFor="search-author" className="search-label">
              작성자
            </label>
            <input
              type="text"
              id="search-author"
              name="search"
              className="search-input"
              placeholder="작성자 검색"
            />
          </li>
        </ul>
      </nav>

      <main id="main-content">
        <table className="notice-table">
          <tbody>
            <tr className="notice-row">
              <td className="notice-date">2025년 1월 6일</td>
              <td className="notice-title">2025년 1학기 학사 일정</td>
              <td className="notice-author">관리자</td>
              <td>
                <button className="details-button">상세보기</button>
              </td>
            </tr>
            <tr className="notice-row">
              <td className="notice-date">2025년 2월 7일</td>
              <td className="notice-title">2025년 1학기 수강신청공고</td>
              <td className="notice-author">관리자</td>
              <td>
                <button className="details-button">상세보기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <aside id="side-menu">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="notice.html" className="menu-link">
              공지사항
            </a>
          </li>
          <li className="menu-item">
            <a href="advertising.html" className="menu-link">
              홍보/광고
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default NoticePage;
