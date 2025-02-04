import React from "react";
import "./css/classroomStudentModal.css";

const StudentDetailModal = ({ students, onClose }) => {
  if (!students) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <div className="student-info-update__main">
          <ul className="student-info-update__list">
            <li className="student-info-update__item">
              <strong className="student-info-update__label">▪️ 이름: </strong>
              {students.name}
            </li>
            <li className="student-info-update__item">
              <strong className="student-info-update__label">▪️ 학번: </strong>
              {students.id}
            </li>
            <li className="student-info-update__item">
              <strong className="student-info-update__label">
                ▪️ 전화번호:{" "}
              </strong>
              {students.number}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
