import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classroomInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassroomRow from "../../Components/ReservationAdmin/Classroom/ClassroomRow";
import ClassroomCreate from "../../Components/ReservationAdmin/Classroom/ClassroomCreate";
import ClassroomDelete from "../../Components/ReservationAdmin/Classroom/ClassroomDelete";

const ClassroomInfoPage = () => {
  // 백앤드 주소
  //const BACKEND_URL = "http://localhost:8000";

  // 강의실 정보 상태 관리
  //const [classroomInfo, setClassroomInfo] = useState([]);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태 관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  const [classroomInfo, setClassroomInfo] = useState([
    {
      classroom_idx: "103",
      classroom_name: "정보융합학부실습실1",
      classroom_exp: "정보 융합학부 실습실입니다. 일반 PC가 구비되어 있습니다.",
    },
    {
      classroom_idx: "104",
      classroom_name: "정보융합학부실습실2",
      classroom_exp: "iMAC 프로 PC 40대가 구비된 실습실 입니다.",
    },
    {
      classroom_idx: "205",
      classroom_name: "강의실",
      classroom_exp:
        "SW융합대학의 강의가 이루어 지는 곳 입니다. 녹화강의복습시스템이 구비되어 있습니다.",
    },
    {
      classroom_idx: "715",
      classroom_name: "정보융합학부 강의실",
      classroom_exp: "정보융합학부 대학원 강의실 입니다.",
    },
  ]);

  // 검색값 상태 관리
  const [searchIdx, setIdx] = useState("");
  const [searchName, setName] = useState("");
  const [searchExp, setExp] = useState("");

  // 검색창에 값 입력하면 상태 변환
  const onChangeIdx = (e) => setIdx(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeExp = (e) => setExp(e.target.value);

  // 검색 결과 화면에 반영
  const filteredClassrooms = classroomInfo.filter((classroom) => {
    return (
      (searchIdx === "" ||
        classroom.classroom_idx?.toString().includes(searchIdx)) &&
      (searchName === "" ||
        classroom.classroom_name
          ?.toLowerCase()
          .includes(searchName.toLowerCase())) &&
      (searchExp === "" || classroom.classroom_exp?.includes(searchExp))
    );
  });

  /* 강의실 데이터 요청
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/classrooms`);
        setClassroomInfo(response.data);
      } catch (error) {
        console.error("강의실 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStudents();
  }, []);*/

  return (
    <div className="div">
      <header className="classroom-info-update__header">
        {/* 사이드바 컴포넌트 */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="classroom-info-update__title">강의실 정보 열람</h1>
      </header>

      <nav className="classroom-info__search-nav">
        <ul className="classroom-info__search-list">
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">호수</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="강의실 호수로 검색하세요."
              onChange={onChangeIdx}
              value={searchIdx}
            />
          </li>
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">이름</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="강의실 이름으로 검색하세요."
              onChange={onChangeName}
              value={searchName}
            />
          </li>
          <li className="classroom-info__search-item">
            <label
              htmlFor="search-author"
              className="classroom-info__search-label"
            >
              설명
            </label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="강의실 설명으로 검색하세요."
              onChange={onChangeExp}
              value={searchExp}
            />
          </li>
        </ul>
      </nav>

      <div className="classroom-info-update__main_div">
        <table className="classroom-info-update__table">
          <tbody>
            {filteredClassrooms.map((classroom, index) => (
              <ClassroomRow key={index} classroom={classroom} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="classroom-info-update__footer">
        <button className="classroom-info-update__action-button">+</button>
        <div className="classroom-info-update__action-container">
          <button
            className="classroom-info-update__action-create"
            onClick={toggleCreateModal}
          >
            강의실 등록
          </button>
          <button
            className="classroom-info-update__action-delete"
            onClick={toggleDeleteModal}
          >
            강의실 삭제
          </button>
        </div>
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && <ClassroomCreate onClose={toggleCreateModal} />}

      {/* 삭제 모달창 컴포넌트 */}
      {isDeleteModalOpen && (
        <ClassroomDelete
          classroom={classroomInfo}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
        />
      )}
    </div>
  );
};

export default ClassroomInfoPage;
