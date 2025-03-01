import React, { useState } from "react";
import "../css/Pages.css";
import "./css/advertisingPage.css";
import Sidebar from "../../Components/NoticeAdmin/NoticeSidebar";
import AdvertisingRow from "../../Components/NoticeAdmin/Advertising/AdvertisingRow";
import AdvertisingCreate from "../../Components/NoticeAdmin/Advertising/AdvertisingCreate";
import AdvertisingDelete from "../../Components/NoticeAdmin/Advertising/AdvertisingDelete";

const AdvertisingPage = () => {
  // 사이드바 상태관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  // 글제목으로 검색 상태관리
  const [searchTitle, setSearchTitle] = useState("");

  // 작성일로 검색 상태관리
  const [searchDate, setSearchDate] = useState("");

  // 작성자명으로 검색 상태관리
  const [searchWriter, setSearchWriter] = useState("");

  // 글 게시중/게시종료 여부에 따른 검색 상태관리
  const [searchStatus, setSearchStatus] = useState("적용됨"); // 기본적으로 '적용됨' 상태의 광고글을 볼 수 있게 하기

  // 검색창에 값 입력하면 상태 변환
  const onChangeTitle = (e) => setSearchTitle(e.target.value);
  const onChangeDate = (e) => setSearchDate(e.target.value);
  const onChangeWriter = (e) => setSearchWriter(e.target.value);
  const onChangeStatus = (e) => setSearchStatus(e.target.value);

  // 문자열 날짜를 ISO Date 객체로 변환
  const parseDate = (dateStr) => {
    if (!dateStr) return null; // 값이 없으면 null 반환

    const dateParts = dateStr.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
    if (!dateParts) {
      return null; // 변환 실패 시 null 반환
    }

    const [, year, month, day] = dateParts;
    return new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );
  };

  // 글 적용 상태 판별 함수
  const getAdvertisingStatus = (startdate, enddate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화

    const start = parseDate(startdate);
    const end = parseDate(enddate);

    if (!start || !end || isNaN(start) || isNaN(end)) {
      console.warn(`날짜 비교 오류 발생: start=${start}, end=${end}`);
      return "적용종료";
    }

    // 모든 날짜의 시간을 00:00:00으로 초기화
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999); // 종료 날짜는 하루 끝까지 포함

    if (start > end) {
      console.warn(`비정상적인 날짜 범위: start=${start}, end=${end}`);
      return "적용종료";
    }

    return today >= start && today <= end ? "적용됨" : "적용종료";
  };

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
      startdate: "2025년 1월 23일",
      enddate: "2025년 3월 20일",
      content: "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ",
    },
    {
      id: 3,
      date: "2025년 1월 8일",
      title: "2025년 xxx 공모전",
      writer: "관리자",
      startdate: "2025년 1월 23일",
      enddate: "2025년 3월 20일",
      content: "ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ",
    },
  ];

  // 검색 결과 필터링
  const filteredNotices = AdvertisingList.filter((item) => {
    const status = getAdvertisingStatus(item.startdate, item.enddate);
    return (
      item.date.toLowerCase().includes(searchDate.toLowerCase()) &&
      item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      item.writer.toLowerCase().includes(searchWriter.toLowerCase()) &&
      (searchStatus === "적용됨"
        ? status === "적용됨"
        : status === searchStatus)
    );
  });

  return (
    <div className="div">
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
              onChange={onChangeStatus}
              value={searchStatus}
            >
              <option value="적용됨">적용됨</option>
              <option value="적용종료">적용종료</option>
            </select>
          </li>
          <li className="advertising-page__search-item">
            <label className="advertising-page__search-label">작성자</label>
            <input
              type="text"
              className="advertising-page__search-input"
              placeholder="작성자명으로 검색하세요. (ex. 관리자)"
              onChange={onChangeWriter}
              value={searchWriter}
            />
          </li>
        </ul>
      </nav>

      <div className="advertising-page__main_div">
        <table className="advertising-page__table">
          <tbody>
            {filteredNotices.map((advertising, index) => (
              <AdvertisingRow key={index} advertising={advertising} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="advertising-page__footer">
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
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

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
