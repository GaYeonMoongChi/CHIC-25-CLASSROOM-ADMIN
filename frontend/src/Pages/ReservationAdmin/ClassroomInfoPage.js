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
  const BACKEND_URL = "http://localhost:8000";

  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태 관리
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setDeleteModalOpen((prev) => !prev);

  // 강의실 정보 상태 관리
  const [classroomInfo, setClassroomInfo] = useState([]);

  // 강의실 데이터 요청
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
  }, []);

  return (
    <div className="div">
      <header className="classroom-info-update__header">
        <h1 className="classroom-info-update__title">강의실 정보 업데이트</h1>
      </header>

      <div className="classroom-info-update__main_div">
        <table className="classroom-info-update__table">
          <tbody>
            {classroomInfo.map((classroom, index) => (
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

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
