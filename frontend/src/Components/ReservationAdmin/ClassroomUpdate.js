import React, { useState } from "react";
import "./css/classroomStudentModal.css";

const ClassroomUpdate = ({ classroom, submit, onClose }) => {
  // 수정할 값들의 상태
  const [number, setNumber] = useState(classroom.number);
  const [name, setName] = useState(classroom.name);
  const [explanation, setExplanation] = useState(classroom.explanation);

  if (!classroom) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="classroom-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-update__title">강의실 정보 수정</h1>
        </header>

        <main className="classroom-update__main">
          <ul className="classroom-update__list">
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 호수: </strong>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 호실명: </strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 설명: </strong>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="classroom-update__textarea"
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="classroom-update__footer">
          <button className="classroom-update__cancle" onClick={onClose}>
            취소
          </button>
          <button className="classroom-update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomUpdate;
