import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Pages.css";
import "./css/noticePage.css";
import NoticeRow from "../../Components/NoticeAdmin/NoticeRow";
import NoticeCreate from "../../Components/NoticeAdmin/NoticeCreate";
import LogoutButton from "../../Components/LogoutButton";

const NoticePage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 페이지 이동
  const navigate = useNavigate();

  // 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  const [searchTitle, setSearchTitle] = useState("");

  const [noticeList, setNoticeList] = useState([]);
  const [error, setError] = useState(null);

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다."); // 토큰이 없으면 알림창을 띄움
      navigate("/"); // 로그인 페이지로 리다이렉트
    }

    fetch(`${BACKEND_URL}/api/notice`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const notices = Array.isArray(data) ? data : data.notices || [];
        setNoticeList(notices);
      })
      .catch((error) => setError(error.message));
  }, [navigate]);

  // 검색 기능
  const filteredNotices =
    searchTitle.trim() === ""
      ? noticeList
      : noticeList.filter(
          (item) =>
            item &&
            item.title?.toLowerCase().includes(searchTitle.toLowerCase())
        );

  // 수정,삭제 결과 새로고침 없이 화면에 바로 반영
  const handleNoticeUpdate = (updatedUpdate, title, contents) => {
    if (!updatedUpdate || !updatedUpdate._id) {
      // 삭제 요청으로 간주
      setNoticeList((prevInfo) =>
        prevInfo.filter(
          (notice) => notice.title !== title || notice.contents !== contents
        )
      );
    } else {
      // 수정 요청
      setNoticeList((prevInfo) =>
        prevInfo.map((notice) =>
          notice._id === updatedUpdate._id ? updatedUpdate : notice
        )
      );
    }
  };

  // 강의실 등록 새로고침 없이 화면에 바로 반영
  const handleNoticeCreate = (newNotice) => {
    setNoticeList((prevInfo) => {
      const updated = [newNotice, ...prevInfo];
      return updated;
    });
    setSearchTitle("");
  };

  return (
    <div className="div">
      <div className="notice-page__header">
        <h1 className="notice-page__title">공지사항</h1>
        <div className="notice-page__nav">
          <button
            className="notice-page__action-create"
            onClick={toggleCreateModal}
          >
            공지 등록
          </button>
          <LogoutButton />
        </div>
      </div>

      <div className="notice-page__search">
        <ul className="notice-page__search-list">
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
            서버에서 공지글 데이터를 받아오지 못했습니다: {error}
          </p>
        ) : noticeList.length === 0 ? (
          <p className="notice-page__empty">등록된 공지글이 없습니다.</p>
        ) : (
          <table className="notice-page__table">
            <tbody>
              {filteredNotices.map((notice, index) => (
                <NoticeRow
                  key={notice._id}
                  notice={notice}
                  onUpdate={handleNoticeUpdate}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      {isCreateModalOpen && (
        <NoticeCreate
          onClose={toggleCreateModal}
          onCreate={handleNoticeCreate}
        />
      )}
    </div>
  );
};

export default NoticePage;
