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
      title: "2025학년도 1학기 재학생 등록금 2차 납부 안내",
      writer: "관리자",
      content: `
1. 등록기간 : 2025.03.04.(화) ~ 03.13.(목) [평일 09:00 ~17:00] [시간외 및 공휴일 납부 불가]
2. 등록금 납부방법
  가. 납부은행 : 하나은행 전 지점
  나. 납부방법
    ① 가상계좌 납부(계좌이체) : 등록금고지서 상에 부여된 개인의 가상계좌로 납부
    ② 고지서로 은행에 직접납부 : 하나은행 전 영업점에서 납부
    ③ 인터넷뱅킹(공과금/대학등록금납부)을 통한 납부
    ④ 은행 자동화기기(ATM, C/D기)를 통한 납부
  다. 등록금고지서 출력
    ▶ 학교 홈페이지→KLAS 로그인 →학적/등록/상담 관리→등록 관리→ 등록금고지서 출력`,
    },
    {
      id: 2,
      date: "2025년 1월 7일",
      title: "2025학년도 1학기 학생증 발급 안내 ",
      writer: "관리자",
      content: `
1. 신청기간 : 2025.02.26~2025.03.31 ​(컴포즈 커피쿠폰 증정 이벤트 中)​
2. 신청방법 :
  1단계 : 하나은행 비대면 통장개설하기 QR촬영 또는 하단의 통장개설하기URL 클릭 -> 하나플러스통장 개설하기
  2단계 :  KLAS로그인->＇모바일학생증(QR)’선택 -> 학생증신청하기 클릭
    ※Klas에서 제3자정보제공 동의 완료된 후에는 하나원큐 앱에서 직접 신청도 가능합니다.
3. 모바일 신청이 안되는 경우 하나은행 광운대출장소 방문하여 신청가능
        *만18세미만,외국인, 최근 1개월이내 타기관에서 계좌개설한 경우 등 -> 방문시 (반)명함판사진 1장 및 신분증 지참필수
4. 학생증카드 수령
  *신청 후 1주~2주후부터 수령안내문자 수신 후 신분증 지참하여 방문수령 -> 하나은행 광운대출장소(비마관1층) 
5. 사용용도
  *중앙도서관출입 : 모바일QR  or 학생증체크카드 터치로 출입 가능
  *쿠폰이용    : 커피쿠폰 or 학생식당쿠폰 등 각종 이벤트 쿠폰사용 가능
  *모바일투표 : 교내 선거 등 모바일 투표 가능
  *교통카드, 할인 , 환율우대등 체크카드 혜택`,
    },
    {
      id: 3,
      date: "2025년 2월 11일",
      title: "[학사] 2025학년도 신입생 학사 안내",
      writer: "관리자",
      content: `
2025학년도 신입학으로 광운가족이 되신 것을 환영합니다.
신입생을 위한 학사안내를 아래와 같이 공지하니 숙지하여 학교생활에 적극 활용하기 바랍니다.

  1. 학번조회 : 2025. 2. 21.(금) 15시 이후 ☞ 학번조회바로가기  
  2. KLAS 로그인 방법
    가. 학번 확인 후 홈페이지 종합정보서비스(KLAS)에서 비밀번호 등록  
    나. ‘비밀번호 최초등록’에서 학번과 성명, 생년월일, 연락처를 입력, 임시비밀번호 수신 후 비밀번호 변경  
    다. 비밀번호는 10자리까지 허용되며 노출되지 않도록 할 것  
  3. 수강신청 : 2025. 2. 24.(월), 10:00 ~ 15:00  
    * 2/24(월)에 수강신청하지 못한 학생은 2. 26.(수) ~ 2. 28(금) 기간 중 하루만 로그인하여 수강신청 가능함  
    * 수강신청 프로그램을 학교 홈페이지에서 다운받아 사용가능  
      ☞ KLAS 바로가기  
      ☞ 수강신청공고 바로가기  
      ☞ 수강신청자료집 바로가기  
      ☞ 강의시간 및 기타 변경사항 안내 바로가기  
      ☞ 수강신청 프로그램 이용방법 바로가기  
  4. 2025학년도 1학기 개강 : 2025. 3. 4.(화)  
    ※ 2025학년도 1학기는 1주 단위가 화요일 ~ 월요일로 진행됨  
  5. 수강신청변경기간 : 2025. 3. 10.(월) ~ 3. 11.(화), 10:00 ~ 15:00  
    * 전자정보공과대학, 인공지능융합대학 및 공과대학 학생은 공지사항 수강상담(수학계획서 작성) 안내 참조  
      ☞ 공지사항 바로가기  
  6. 학번 조회 후 본인의 분반을 확인하여 분반에 해당되는 교과목을 수강신청하여야 함. 타 분반 교과목 신청 불가  
    * ‘광운인되기’(원격강좌) : 1학기에 수강신청하지 못할 경우 2학기에 수강신청하여야 함.  
  7. 전체 교양과목(학정번호 0000-으로 시작하는 교과목) 수강신청은 각 교양계열의 단위별(100, 200, 300단위)로 1과목을 초과하여 수강신청 할 수 없음. 단, 수리와자연(수학)은 가능함.  
    ※ 난이도 확인 방법 : 학정번호 5번째 자리 숫자 (예 : 0000-1-1077-01 영어회화 → 난이도 1)  
  8. 수강신청 및 학사 관련 문의 : 학과사무실(첨부파일 참조)  
`,
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
        {/* 사이드바 컴포넌트 */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
