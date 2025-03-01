import "../css/Pages.css";
import "./css/noticePage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import NoticeRow from "../../Components/NoticeAdmin/Notice/NoticeRow";
import React, { useState } from "react";
import NoticeCreate from "../../Components/NoticeAdmin/Notice/NoticeCreate";
import NoticeDelete from "../../Components/NoticeAdmin/Notice/NoticeDelete";

const NoticePage = () => {
  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태 관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  // 글제목으로검색 상태 관리
  const [searchTitle, setSearchTitle] = useState("");

  // 작성일로검색 상태 관리
  const [searchDate, setSearchDate] = useState("");

  // 작성자명으로검색 상태 관리
  const [searchWriter, setSearchWriter] = useState("");

  // 검색창에 값 입력하면 상태 변환
  const onChangeTitle = (e) => setSearchTitle(e.target.value);
  const onChangeDate = (e) => setSearchDate(e.target.value);
  const onChangeWriter = (e) => setSearchWriter(e.target.value);

  // 공지글 데이터 (임시)
  const NoticeList = [
    {
      id: 1,
      date: "2025년 1월 6일",
      title: "2025년 1학기 수강신청 공고",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      date: "2025년 1월 7일",
      title: "2025년 1학기 학사 일정",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      date: "2025년 1월 8일",
      title: "2025년 1학기 등록금 고지서",
      writer: "관리자",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];

  // 검색 결과 화면에 반영
  const filteredNotices = NoticeList.filter(
    (item) =>
      item.date.toLowerCase().includes(searchDate.toLowerCase()) &&
      item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      item.writer.toLowerCase().includes(searchWriter.toLowerCase())
  );

  return (
    <div className="div">
      <header className="notice-page__header">
        <h1 className="notice-page__title">공지사항</h1>
      </header>

      <nav className="notice-page__search-nav">
        <ul className="notice-page__search-list">
          <li className="notice-page__search-item">
            <label className="notice-page__search-label">작성일</label>
            <input
              type="text"
              name="search"
              className="notice-page__search-input"
              placeholder="[xxxx년 x월 x일] 형식으로 입력해주세요."
              onChange={onChangeDate}
              value={searchDate}
            />
          </li>
          <li className="notice-page__search-item">
            <label className="notice-page__search-label">제목</label>
            <input
              type="text"
              name="search"
              className="notice-page__search-input"
              placeholder="공지글 제목으로 검색하세요."
              onChange={onChangeTitle}
              value={searchTitle}
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
              name="search"
              className="notice-page__search-input"
              placeholder="작성자명으로 검색하세요. (ex. 관리자)"
              onChange={onChangeWriter}
              value={searchWriter}
            />
          </li>
        </ul>
      </nav>

      <div className="notice-page__main_div">
        <table className="notice-page__table">
          <tbody>
            {filteredNotices.map((notice, index) => (
              <NoticeRow key={index} notice={notice} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="notice-page__footer">
        <button className="notice-page__action-button">+</button>
        <div className="notice-page__action-container">
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
        </div>
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          isOpen={isSidebarOpen}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && <NoticeCreate onClose={toggleCreateModal} />}

      {/* 삭제 모달창 컴포넌트 */}
      {isDeleteModalOpen && (
        <NoticeDelete
          notice={NoticeList}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
        />
      )}
    </div>
  );
};

export default NoticePage;
