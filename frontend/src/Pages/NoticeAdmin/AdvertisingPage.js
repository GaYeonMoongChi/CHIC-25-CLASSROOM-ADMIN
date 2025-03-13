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
      date: "2025년 2월 7일",
      title:
        "📢 [ ⏰ 전국 최대 규모 대학생 IT 연합 사이드 프로젝트 동아리 UMC 광운대 8기 모집 ⏰ ]",
      writer: "관리자",
      startdate: "2025년 2월 7일",
      enddate: "2025년 2월 20일",
      contents:
        "안녕하세요😊 전국 대학생 연합 IT 프로젝트 동아리 University MakeUs Challenge(UMC) 입니다! 💚UMC💚는 다양한 학교의 친구들과 네트워킹하고, 6개월 간의 열정과 끈기로 성장할 챌린저들과 “실제로 동작하는 서비스를 만들어보자!”라는 목표를 향해 달립니다 🏃 매 기수마다 약 1000명 정도의 학생들이 함께하고 있습니다❤‍🔥",
    },
    {
      id: 2,
      date: "2025년 1월 7일",
      title: "멋쟁이사자처럼 13기 아기사자 모집 공고",
      writer: "관리자",
      startdate: "2025년 2월 16일",
      enddate: "2025년 3월 1일",
      contents:
        " “GROWL TO WORLD” 멋쟁이사자처럼 대학은 테크 기반의 아이디어 실현을 위해 국내외 121개 대학이 모여 이루어진 국내 최대 규모 IT 연합 동아리입니다.광운대학교 멋쟁이사자처럼에서 13기 아기사자를 모집합니다! 멋쟁이사자처럼에 관심이 있으신 분들은 해당 글을 참고하여 지원해주세요! 추가 문의사항이 있으시다면 아래 연락처로 문의 부탁드립니다 🙏🏻",
    },
    {
      id: 3,
      date: "2025년 1월 8일",
      title:
        "🚨 [마감 임박] [코드잇 스프린트] AI / 프론트엔드 / 백엔드 부트캠프 모집 중!",
      writer: "관리자",
      startdate: "2025년 1월 23일",
      enddate: "2025년 3월 20일",
      contents:
        "누적 수강생 1,000명 돌파! 1등 부트캠프 코드잇 스프린트에서 예비 개발자를 찾고 있어요🔍 개발자 커리어, 차곡차곡 제대로 쌓아가고 싶다면? 지금 바로 지원해요 ▶ https://code.it/1LKqoyA",
    },
    {
      id: 4,
      date: "2025년 3월 2일",
      title: "🌙인공지능융합대학 학생회 '백야' 신입국원 모집☀",
      writer: "관리자",
      startdate: "2025년 1월 23일",
      enddate: "2025년 3월 20일",
      contents: `안녕하세요! 인공지능융합대학 제2대 학생회 '백야'입니다!'백야'에서 2025년을 함께할 신입 국원분들을 모집합니다!
      
      📌 모집대상 : 인공지능융합대학 소속 신입생/재학생
      📌 지원요건 : 2025학년도 재학
      📌 지원기간: 3/4(화) ~ 3/7(금) 18시까지
      📌 면접기간 : 3/10(월) ~ 3/12(수) 18시까지
      📌 합격자 발표 : 3/12(수)
      📌 지원방법 : 지원기간 내 구글폼 작성
      📌 지원 구글폼 : 학부 단톡방 또는 백야 인스타그램 링크트리 참고

  ⚠궁금하신 점은 회장단 연락처, 백야 인스타그램 DM, 백야 오픈채팅방으로 부탁드립니다!`,
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
        {/* 사이드바 컴포넌트 */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
