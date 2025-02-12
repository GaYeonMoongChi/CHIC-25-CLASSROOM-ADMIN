import React, { useState } from "react";
import "../css/Pages.css";
import "./css/advertisingPage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import AdvertisingRow from "../../Components/NoticeAdmin/Advertising/AdvertisingRow";
import AdvertisingCreate from "../../Components/NoticeAdmin/Advertising/AdvertisingCreate";
import AdvertisingDelete from "../../Components/NoticeAdmin/Advertising/AdvertisingDelete";

const AdvertisingPage = () => {
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
  const AdvertisingList = [
    {
      id: 1,
      date: "2025년 1월 6일",
      title: "2025년 신입생 특별영어과정",
      writer: "관리자",
      startdate: "2025년 1월 6일",
      enddate: "2025년 1월 13일",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      date: "2025년 1월 7일",
      title: "자율전공학부 재학생 멘토 모집 안내",
      writer: "관리자",
      startdate: "2025년 1월 7일",
      enddate: "2025년 1월 13일",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 3,
      date: "2025년 1월 8일",
      title: "2025년 탄소 중립 실천 공모전",
      writer: "관리자",
      startdate: "2025년 1월 8일",
      enddate: "2025년 1월 13일",
      content: "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ",
    },
  ];

  // 검색 결과 화면에 반영
  const filteredNotices = AdvertisingList.filter(
    (item) =>
      item.date.toLowerCase().includes(searchDate.toLowerCase()) &&
      item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      item.writer.toLowerCase().includes(searchWriter.toLowerCase())
  );

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="advertising-page__header">
          <h1 className="advertising-page__title">홍보/광고</h1>
        </header>

        <nav className="advertising-page__search-nav">
          <ul className="advertising-page__search-list">
            <li className="advertising-page__search-item">
              <label className="advertising-page__search-label">작성일</label>
              <input
                type="text"
                className="advertising-page__search-input"
                placeholder="[xxxx년 x월 x일] 형식으로 입력해주세요."
                onChange={onChangeDate}
                value={searchDate}
              />
            </li>
            <li className="advertising-page__search-item">
              <label className="advertising-page__search-label">제목</label>
              <input
                type="text"
                className="advertising-page__search-input"
                placeholder="글제목으로 검색하세요."
                onChange={onChangeTitle}
                value={searchTitle}
              />
            </li>
            <li className="advertising-page__search-item">
              <label className="advertising-page__search-label">상태</label>
              <select
                name="advertising-status"
                className="advertising-page__status-select"
              >
                <option value="exposure" selected>
                  적용됨
                </option>
                <option value="not-exposure">적용종료</option>
              </select>
            </li>
            <li className="advertising-page__search-item">
              <label className="advertising-page__search-label">작성자</label>
              <input
                type="text"
                className="advertising-page__search-input"
                placeholder="작성자명으로 검색하세요. (ex. 관리자)"
                onChange={onChangeWriter}
                value={onChangeWriter}
              />
            </li>
          </ul>
        </nav>

        <div className="advertising-page__main_div ">
          <main className="advertising-page__main">
            <table className="advertising-page__table">
              <tbody>
                {filteredNotices.map((advertising, index) => (
                  <AdvertisingRow key={index} advertising={advertising} />
                ))}
              </tbody>
            </table>
          </main>
        </div>

        <footer className="advertising-page__footer">
          <button className="advertising-page__action-button">+</button>
          <div className="advertising-page__action-container">
            <button
              className="advertising-page__action-create"
              onClick={toggleCreateModal}
            >
              글생성
            </button>
            <button
              className="advertising-page__action-delete"
              onClick={toggleDeleteModal}
            >
              글삭제
            </button>
          </div>
        </footer>
      </div>

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && <AdvertisingCreate onClose={toggleCreateModal} />}

      {/* 삭제 모달창 컴포넌트 */}
      {isDeleteModalOpen && (
        <AdvertisingDelete
          advertising={AdvertisingList}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
        />
      )}
    </div>
  );
};

export default AdvertisingPage;
