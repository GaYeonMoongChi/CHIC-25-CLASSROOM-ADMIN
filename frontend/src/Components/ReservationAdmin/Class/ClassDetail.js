import React, { useState } from "react";
import "../css/classroomStudentModal.css";
import ClassUpdate from "./ClassUpdate";

const DetailModal = ({ classes, onClose, onUpdate }) => {
  // 수정 모달 상태 관리
  const [isUpdateMode, setUpdateMode] = useState(false);
  const switchUpdateMode = () => setUpdateMode((prev) => !prev);

  if (!classes) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="class-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="class-details__title">{classes.class_name}</h1>
        </header>

        <main className="class-details__main">
          <ul className="class-details__list">
            <li className="class-details__item">
              <strong className="class-details__label">▪️ 학정번호: </strong>
              <div className="class-details__content">{classes.class_idx}</div>
            </li>
            <li className="class-details__item">
              <strong className="class-details__label">▪️ 강의실 호수: </strong>
              <div className="class-details__content">
                {classes.classroom_idx}
              </div>
            </li>
            <li className="class-details__item">
              <strong className="class-details__label">▪️ 교수명: </strong>
              <div className="class-details__content">{classes.prof_name}</div>
            </li>
            <li className="class-details__item">
              <strong className="class-details__label">▪️ 취득학점: </strong>
              <div className="class-details__content">
                {classes.class_credit}
              </div>
            </li>
            <li className="class-details__item">
              <strong className="class-details__label">▪️ 강의시간: </strong>
              <div className="class-details__content">
                {classes.class_daytimet}
              </div>
            </li>
          </ul>
        </main>

        <footer className="class-details__footer">
          <button className="class-details__update" onClick={switchUpdateMode}>
            수정
          </button>
        </footer>
      </div>

      {isUpdateMode && (
        <ClassUpdate
          classes={classes}
          submit={switchUpdateMode}
          onClose={switchUpdateMode}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default DetailModal;
