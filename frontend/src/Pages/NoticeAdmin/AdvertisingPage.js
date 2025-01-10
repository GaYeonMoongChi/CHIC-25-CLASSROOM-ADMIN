import React from "react";
import "../css/Pages.css";

const AdvertisingPage = () => {
  return (
    <div className="div">
      <header id="header">
        <span className="title">홍보/광고</span>
        <button className="create-post-button">새로운 글 생성</button>
      </header>

      <nav id="search-nav">
        <ul className="search-list">
          <li className="search-item">
            작성일
            <input
              type="date"
              name="search"
              className="search-input"
              placeholder="작성일 검색"
            />
          </li>
          <li className="search-item">
            제목
            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="제목 검색"
            />
          </li>
          <li className="search-item">
            적용시작일
            <input
              type="date"
              name="search"
              className="search-input"
              placeholder="적용시작일 검색"
            />
          </li>
          <li className="search-item">
            적용종료일
            <input
              type="date"
              name="search"
              className="search-input"
              placeholder="적용종료일 검색"
            />
          </li>
          <li className="search-item">
            상태
            <form action="" className="status-form">
              <select name="advertising-status" className="status-select">
                <option value="exposure" selected>
                  적용됨
                </option>
                <option value="not-exposure">적용종료</option>
              </select>
            </form>
          </li>
          <li className="search-item">
            작성자
            <input
              type="text"
              className="search-input"
              placeholder="작성자 검색"
            />
          </li>
        </ul>
      </nav>

      <main id="main-content">
        <table className="advertising-table">
          <tbody>
            <tr className="table-row">
              <td className="table-cell">2025년 1월 6일</td>
              <td className="table-cell">2025년 CDP 강의 일정</td>
              <td className="table-cell">2025 01 06 ~</td>
              <td className="table-cell">2025 01 31</td>
              <td className="table-cell">관리자</td>
              <td className="table-cell">
                <button className="detail-button">상세보기</button>
              </td>
            </tr>
            <tr className="table-row">
              <td className="table-cell">2025년 1월 6일</td>
              <td className="table-cell">2025년</td>
              <td className="table-cell">2025 01 06 ~</td>
              <td className="table-cell">2025 01 31</td>
              <td className="table-cell">관리자</td>
              <td className="table-cell">
                <button className="detail-button">상세보기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <aside id="sidebar">
        <ul className="sidebar-links">
          <li className="sidebar-item">
            <a href="notice.html" className="sidebar-link">
              공지사항
            </a>
          </li>
          <li className="sidebar-item">
            <a href="advertising.html" className="sidebar-link">
              홍보/광고
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default AdvertisingPage;
