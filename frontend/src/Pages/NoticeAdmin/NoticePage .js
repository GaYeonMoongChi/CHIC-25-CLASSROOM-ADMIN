import "../css/Pages.css";
import "./css/noticePage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import NoticeRow from "../../Components/NoticeAdmin/NoticeRow";
import React, { useState } from "react";

const NoticePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const NoticeList = [
    {
      date: "2025년 1월 6일",
      title: "2025년 1학기 수강신청 공고",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      date: "2025년 1월 7일",
      title: "2025년 1학기 학사 일정",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      date: "2025년 1월 8일",
      title: "2025년 1학기 등록금 고지서",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

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
              {NoticeList.map((notice, index) => (
                <NoticeRow key={index} notice={notice} />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NoticePage;
