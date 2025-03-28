import React, { useState } from "react";
import "../css/classroomStudentModal.css";
import ClassroomUpdate from "./ClassroomUpdate";

const DetailModal = ({ classroom, onClose, onUpdate }) => {
  // 수정 모달 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!classroom) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="classroom-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-details__title">
            {classroom.classroom_idx}호
          </h1>
        </header>

        <main className="classroom-details__main">
          <ul className="classroom-details__list">
            <li className="classroom-details__item">
              <strong className="classroom-details__label">
                ▪️ 강의실명:{" "}
              </strong>
              <div className="classroom-details__content">
                {classroom.classroom_name}
              </div>
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 설명: </strong>
              <div className="classroom-details__content">
                {classroom.classroom_exp}
              </div>
            </li>
          </ul>
        </main>

        <footer className="classroom-details__footer">
          <button
            className="classroom-details__update"
            onClick={switchUpdateMode}
          >
            수정
          </button>
        </footer>
      </div>

      {isUpdateMode && (
        <ClassroomUpdate
          classroom={classroom}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default DetailModal;
