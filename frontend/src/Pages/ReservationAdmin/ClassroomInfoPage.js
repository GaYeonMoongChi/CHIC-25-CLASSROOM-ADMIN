import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classroomInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassroomRow from "../../Components/ReservationAdmin/Classroom/ClassroomRow";
import ClassroomCreate from "../../Components/ReservationAdmin/Classroom/ClassroomCreate";
import ClassroomDelete from "../../Components/ReservationAdmin/Classroom/ClassroomDelete";
import LogoutButton from "../../Components/LogoutButton";

const ClassroomInfoPage = () => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

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
      classroom_building: "새빛관",
      classroom_idx: "103",
      classroom_name: "정보융합학부실습실1",
      classroom_exp: "정보 융합학부 실습실입니다. 일반 PC가 구비되어 있습니다.",
    },
    {
      classroom_building: "새빛관",
      classroom_idx: "104",
      classroom_name: "정보융합학부실습실2",
      classroom_exp: "iMAC 프로 PC 40대가 구비된 실습실 입니다.",
    },
    {
      classroom_building: "새빛관",
      classroom_idx: "205",
      classroom_name: "강의실",
      classroom_exp:
        "SW융합대학의 강의가 이루어 지는 곳 입니다. 녹화강의복습시스템이 구비되어 있습니다.",
    },
    {
      classroom_building: "새빛관",
      classroom_idx: "715",
      classroom_name: "정보융합학부 강의실",
      classroom_exp: "정보융합학부 대학원 강의실 입니다.",
    },
  ]);

  // 검색값 상태 관리
  const [searchIdx, setIdx] = useState("");
  const [searchName, setName] = useState("");
  const [searchBuilding, setBuilding] = useState("");

  // 검색창에 값 입력하면 상태 변환
  const onChangeIdx = (e) => setIdx(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeBuilding = (e) => setBuilding(e.target.value);

  // 검색 결과 화면에 반영
  const filteredClassrooms = classroomInfo.filter((classroom) => {
    return (
      (searchIdx === "" ||
        classroom.classroom_idx?.toString().includes(searchIdx)) &&
      (searchName === "" ||
        classroom.classroom_name
          ?.toLowerCase()
          .includes(searchName.toLowerCase())) &&
      (searchBuilding === "" ||
        classroom.classroom_building?.includes(searchBuilding))
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
          <button
            className="classroom-info-update__action-delete"
            onClick={toggleDeleteModal}
          >
            강의실 삭제
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* 검색바 */}
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
          <li className="classroom-info__search-item">
            <label className="classroom-info__search-label">강의실명</label>
            <input
              type="text"
              name="search"
              className="classroom-info__search-input"
              placeholder="강의실 이름으로 검색하세요."
              onChange={onChangeName}
              value={searchName}
            />
          </li>
        </ul>
      </div>

      {/* 강의실 정보 리스트 */}
      <div className="classroom-info-update__main">
        <h2 className="classroom-info__building-name">🏢 새빛관</h2>
        <table className="classroom-info-update__table">
          <tbody>
            {filteredClassrooms.map((classroom, index) => (
              <ClassroomRow key={index} classroom={classroom} />
            ))}
          </tbody>
        </table>
      </div>

      {/* 사이드바가 열릴 때 표시되는 오버레이 */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* 등록 모달창 */}
      {isCreateModalOpen && <ClassroomCreate onClose={toggleCreateModal} />}

      {/* 삭제 모달창 */}
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
