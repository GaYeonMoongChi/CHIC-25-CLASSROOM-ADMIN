import React, { useState } from "react";
import "../css/classroomStudentModal.css";
import StudentUdpate from "./StudentUpdate";

const StudentDetailModal = ({ students, onClose }) => {
  // 수정 모달 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!students) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="students-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="students-details__title">학생 상세보기</h1>
        </header>

        <main className="students-details__main">
          <ul className="students-details__list">
            <li className="students-details__item">
              <strong className="students-details__label">▪️ 이름: </strong>
              {students.name}
            </li>
            <li className="students-details__item">
              <strong className="students-details__label">▪️ 학번: </strong>
              {students.id}
            </li>
            <li className="students-details__item">
              <strong className="students-details__label">▪️ 전화번호: </strong>
              {students.number}
            </li>
          </ul>
        </main>

        <footer className="students-details__footer">
          <button
            className="students-details__update"
            onClick={switchUpdateMode}
          >
            수정
          </button>
        </footer>
      </div>

      {isUpdateMode && (
        <StudentUdpate
          students={students}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
        />
      )}
    </div>
  );
};

export default StudentDetailModal;
