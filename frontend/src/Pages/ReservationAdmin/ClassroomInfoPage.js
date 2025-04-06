import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Pages.css";
import "./css/classroomInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassroomBuilding from "../../Components/ReservationAdmin/Classroom/ClassroomBuilding";
import ClassroomCreate from "../../Components/ReservationAdmin/Classroom/ClassroomCreate";
import LogoutButton from "../../Components/LogoutButton";

const ClassroomInfoPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 페이지 이동 네비게이션
  const navigate = useNavigate();

  // 강의실 정보 상태 관리
  const [classroomInfo, setClassroomInfo] = useState([]);

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 검색값 상태 관리
  const [searchIdx, setIdx] = useState("");
  const [searchBuilding, setBuilding] = useState("");

  // 검색창에 값 입력하면 상태 변환
  const onChangeIdx = (e) => setIdx(e.target.value);
  const onChangeBuilding = (e) => setBuilding(e.target.value);

  // JWT 토큰 확인 및 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다."); // 토큰이 없으면 알림창을 띄움
      navigate("/"); // 로그인 페이지로 리다이렉트
    }

    // 강의실 정보 데이터 요청
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/classroom`);
        setClassroomInfo(response.data);
      } catch (error) {
        console.error("강의실 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchClassrooms();
  }, [navigate]);

  // 검색 결과 화면에 반영
  const filteredClassrooms = classroomInfo.filter((classroom) => {
    return (
      (searchIdx === "" || classroom.room?.toString().includes(searchIdx)) &&
      (searchBuilding === "" || classroom.building?.includes(searchBuilding))
    );
  });

  // 수정,삭제 결과 새로고침 없이 화면에 바로 반영
  const handleClassroomUpdate = (updatedClassroom, building, room) => {
    if (updatedClassroom === null) {
      setClassroomInfo((prevInfo) =>
        prevInfo.filter(
          (classroom) =>
            classroom.building !== building || classroom.room !== room
        )
      );
    } else {
      setClassroomInfo((prevInfo) =>
        prevInfo.map((classroom) =>
          classroom.building === updatedClassroom.building &&
          classroom.room === updatedClassroom.room
            ? updatedClassroom
            : classroom
        )
      );
    }
  };

  // 강의실 등록 새로고침 없이 화면에 바로 반영
  const handleClassroomCreate = (newClassroom) => {
    setClassroomInfo((prevInfo) => [...prevInfo, newClassroom]);
    setIdx("");
    setBuilding("");
  };

  return (
    <div className="div">
      {/* 헤더 */}
      <div className="classroom-info-update__header">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <h1 className="classroom-info-update__title">강의실 정보 관리</h1>
        <div className="classroom-info-update__nav">
          <button
            className="classroom-info-update__action-create"
            onClick={toggleCreateModal}
          >
            강의실 등록
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* 강의실 검색바 */}
      <div className="classroom-info__search">
        <ul className="classroom-info__search-list">
          <li className="classroom-info__search-item">
            <label
              htmlFor="search-author"
              className="classroom-info__search-label"
            >
              건물명
            </label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="건물명으로 검색하세요."
              onChange={onChangeBuilding}
              value={searchBuilding}
            />
          </li>
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
        </ul>
      </div>

      {/* 강의실 정보 리스트 */}
      <div className="classroom-info-update__main">
        <ClassroomBuilding
          classrooms={filteredClassrooms}
          onUpdate={handleClassroomUpdate}
        />
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 등록 모달창 */}
      {isCreateModalOpen && (
        <ClassroomCreate
          onClose={toggleCreateModal}
          onCreate={handleClassroomCreate}
        />
      )}
    </div>
  );
};

export default ClassroomInfoPage;
