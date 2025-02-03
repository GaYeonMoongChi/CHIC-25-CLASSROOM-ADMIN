import React, { useState } from "react";
import "./css/classroomStudentModal.css";
import ClassroomUpdate from "./ClassroomUpdate";

const DetailModal = ({ classroom, onClose }) => {
  // 수정 모드 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!classroom) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="classroom-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-details__classNumber">{classroom.number}</h1>
        </header>

        <main className="classroom-details__main">
          <ul className="classroom-details__list">
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 호실명: </strong>
              {classroom.name}
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 설명: </strong>
              {classroom.explanation}
            </li>
          </ul>
        </main>

        <footer>
          <button className="update" onClick={switchUpdateMode}>
            수정
          </button>
        </footer>
      </div>

      {isUpdateMode && (
        <ClassroomUpdate
          classroom={classroom}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
        />
      )}
    </div>
  );
};

export default DetailModal;
