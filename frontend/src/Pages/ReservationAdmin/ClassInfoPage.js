import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/classInfoUpdatePage.css";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import ClassRow from "../../Components/ReservationAdmin/Class/ClassRow";
import ClassCreate from "../../Components/ReservationAdmin/Class/ClassCreate";
import ClassDelete from "../../Components/ReservationAdmin/Class/ClassDelete";

const ClassInfoPage = () => {
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

  // 강의 정보 상태 관리
  const [classInfo, setClassInfo] = useState([]);

  // 강의 데이터 요청
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/classes`);
        setClassInfo(response.data);
      } catch (error) {
        console.error("강의 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStudents();
  }, []);

  // 등록된 내용 새로고침 없이 업데이트
  const handleCreateClass = (newClasses) => {
    setClassInfo((prevClasses) => [...prevClasses, newClasses]);
  };

  // 수정된 내용 새로고침 없이 업데이트
  const handleUpdateClass = (updatedStudent) => {
    setClassInfo((prevStudents) =>
      prevStudents.map((classes) =>
        classes.id === updatedStudent.id ? updatedStudent : classes
      )
    );
  };

  // 삭제된 내용 새로고침 없이 업데이트
  const handleDeleteClass = (deletedStudentIds) => {
    setClassInfo((prevStudents) =>
      prevStudents.filter((classes) => !deletedStudentIds.includes(classes.id))
    );
  };

  return (
    <div className="div">
      <header className="class-info-update__header">
        <h1 className="class-info-update__title">강의 정보 업데이트</h1>
      </header>

      <div className="class-info-update__main_div">
        <main className="class-info-update__main">
          <table className="class-info-update__table">
            <tbody>
              {classInfo.map((classes, index) => (
                <ClassRow
                  key={index}
                  classes={classes}
                  onUpdate={handleUpdateClass}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <footer className="class-info-update__footer">
        <button className="class-info-update__action-button">+</button>
        <div className="class-info-update__action-container">
          <button
            className="class-info-update__action-create"
            onClick={toggleCreateModal}
          >
            강의 등록
          </button>
          <button
            className="class-info-update__action-delete"
            onClick={toggleDeleteModal}
          >
            강의 삭제
          </button>
        </div>
      </footer>

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && (
        <ClassCreate onClose={toggleCreateModal} onCreate={handleCreateClass} />
      )}

      {/* 삭제 모달창 컴포넌트 */}
      {isDeleteModalOpen && (
        <ClassDelete
          classes={classInfo}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
          onDelete={handleDeleteClass}
        />
      )}
    </div>
  );
};

export default ClassInfoPage;
