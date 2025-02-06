import React, { useState } from "react";
import "../css/Pages.css";
import "./css/studentInfo.css";
import StudentRow from "../../Components/ReservationAdmin/Student/StudentRow";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import StudentCreate from "../../Components/ReservationAdmin/Student/StudentCreate";
import StudentDelete from "../../Components/ReservationAdmin/Student/StudentDelete";

const StudentInfoPage = () => {
  // 사이드바 상태 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // 등록 모달창 상태 관리
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const toggleCreateModal = () => setCreateModalOpen((prev) => !prev);

  // 삭제 모드 상태 관리
  const [isDeleteMode, setDeleteMode] = useState(false);
  const switchDeleteMode = () => setDeleteMode((prev) => !prev);

  // 강의실 정보 데이터 (임시)
  const studentInfo = [
    {
      id: "2022123456",
      name: "김가연",
      number: "010-1234-5678",
    },
    {
      id: "2023123123",
      name: "박서현",
      number: "010-1234-5678",
    },
    {
      id: "2024123123",
      name: "정유빈",
      number: "010-1234-5678",
    },
    {
      id: "2021202032",
      name: "손아현",
      number: "010-1234-5678",
    },
  ];

  // 삭제 모드
  if (isDeleteMode) {
    return (
      <StudentDelete
        students={studentInfo}
        submit={switchDeleteMode}
        onClose={switchDeleteMode}
      />
    );
  }

  return (
    <div className="div">
      <div className={`div ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="student-info__header">
          <h1 className="student-info__title">학생 정보 업데이트</h1>
          <button
            className="student-info__action-button"
            onClick={toggleCreateModal}
          >
            등록
          </button>
          <button
            className="student-info__action-button"
            onClick={switchDeleteMode}
          >
            삭제
          </button>
        </header>

        <main className="student-info__main">
          <table className="student-info__table">
            <tbody>
              {studentInfo.map((students, index) => (
                <StudentRow key={index} students={students} />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && <StudentCreate onClose={toggleCreateModal} />}
    </div>
  );
};

export default StudentInfoPage;
