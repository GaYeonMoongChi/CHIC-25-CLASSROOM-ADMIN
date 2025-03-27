import React, { useState, useEffect } from "react";
import "../css/Pages.css";
import "./css/noticePage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import NoticeRow from "../../Components/NoticeAdmin/Notice/NoticeRow";
import NoticeCreate from "../../Components/NoticeAdmin/Notice/NoticeCreate";
import NoticeDelete from "../../Components/NoticeAdmin/Notice/NoticeDelete";
import LogoutButton from "../../Components/LogoutButton";

const NoticePage = () => {
  const BACKEND_URL = "http://localhost:8000";

  // 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [noticeList, setNoticeList] = useState([]);
  const [error, setError] = useState(null);

  // GET 요청
  useEffect(() => {
    fetch(`${BACKEND_URL}/notices`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setNoticeList(data))
      .catch((error) => setError(error.message));
  }, []);

  const filteredNotices = noticeList.filter(
    (item) =>
      item.date.toLowerCase().includes(searchDate.toLowerCase()) &&
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="div">
      <div className="notice-page__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="notice-page__title">공지사항</h1>
        <div className="classroom-info-update__nav">
          <button
            className="notice-page__action-create"
            onClick={toggleCreateModal}
          >
            글생성
          </button>
          <button
            className="notice-page__action-delete"
            onClick={toggleDeleteModal}
          >
            글삭제
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="notice-page__search">
        <ul className="notice-page__search-list">
          <li className="notice-page__search-item">
            <label className="notice-page__search-label">작성일</label>
            <input
              type="text"
              className="notice-page__search-input"
              placeholder="[xxxx년 x월 x일] 형식으로 입력해주세요."
              onChange={(e) => setSearchDate(e.target.value)}
              value={searchDate}
            />
          </li>
          <li className="notice-page__search-item">
            <label className="notice-page__search-label">제목</label>
            <input
              type="text"
              className="notice-page__search-input"
              placeholder="공지글 제목으로 검색하세요."
              onChange={(e) => setSearchTitle(e.target.value)}
              value={searchTitle}
            />
          </li>
        </ul>
      </div>

      <div className="notice-page__main">
        {error ? (
          <p className="notice-page__error">
            서버에서 데이터를 받아오지 못했습니다: {error}
          </p>
        ) : noticeList.length === 0 ? (
          <p className="notice-page__empty">등록된 공지사항이 없습니다.</p>
        ) : (
          <table className="notice-page__table">
            <tbody>
              {filteredNotices.map((notice, index) => (
                <NoticeRow key={index} notice={notice} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      {isCreateModalOpen && <NoticeCreate onClose={toggleCreateModal} />}
      {isDeleteModalOpen && (
        <NoticeDelete
          notice={filteredNotices}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
        />
      )}
    </div>
  );
};

export default NoticePage;
