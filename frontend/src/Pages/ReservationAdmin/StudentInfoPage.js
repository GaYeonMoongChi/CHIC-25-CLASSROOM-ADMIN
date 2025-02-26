import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Pages.css";
import "./css/studentInfo.css";
import StudentRow from "../../Components/ReservationAdmin/Student/StudentRow";
import Sidebar from "../../Components/ReservationAdmin/ReservationSidebar";
import StudentCreate from "../../Components/ReservationAdmin/Student/StudentCreate";
import StudentDelete from "../../Components/ReservationAdmin/Student/StudentDelete";

const StudentInfoPage = () => {
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

  // 학생 정보 상태 관리
  const [studentInfo, setStudentInfo] = useState([]);

  // 학생 데이터 요청
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/students`);
        setStudentInfo(response.data);
      } catch (error) {
        console.error("학생 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStudents();
  }, []);

  // 등록된 내용 새로고침 없이 업데이트
  const handleCreateStudent = (newStudent) => {
    setStudentInfo((prevStudents) => [...prevStudents, newStudent]);
  };

  // 수정된 내용 새로고침 없이 업데이트
  const handleUpdateStudent = (updatedStudent) => {
    setStudentInfo((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // 삭제된된 내용 새로고침 없이 업데이트
  const handleDeleteStudents = (deletedStudentIds) => {
    setStudentInfo((prevStudents) =>
      prevStudents.filter((student) => !deletedStudentIds.includes(student.id))
    );
  };

  return (
    <div className="div">
      <header className="student-info__header">
        <h1 className="student-info__title">학생 정보 업데이트</h1>
      </header>

      <div className="student-info__main_div">
        <main className="student-info__main">
          <table className="student-info__table">
            <tbody>
              {studentInfo.map((students, index) => (
                <StudentRow
                  key={index}
                  students={students}
                  onUpdate={handleUpdateStudent}
                />
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <footer className="student-info__footer">
        <button className="student-info__action-button">+</button>
        <div className="student-info__action-container">
          <button
            className="student-info__action-create"
            onClick={toggleCreateModal}
          >
            학생 등록
          </button>
          <button
            className="student-info__action-delete"
            onClick={toggleDeleteModal}
          >
            학생 삭제
          </button>
        </div>
      </footer>

      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 등록 모달창 컴포넌트 */}
      {isCreateModalOpen && (
        <StudentCreate
          onClose={toggleCreateModal}
          onCreate={handleCreateStudent}
        />
      )}

      {/* 삭제 모달창 컴포넌트 */}
      {isDeleteModalOpen && (
        <StudentDelete
          students={studentInfo}
          submit={toggleDeleteModal}
          onClose={toggleDeleteModal}
          onDelete={handleDeleteStudents}
        />
      )}
    </div>
  );
};

export default StudentInfoPage;
