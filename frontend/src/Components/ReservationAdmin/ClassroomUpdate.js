import React, { useState } from "react";
import "./css/classroomStudentModal.css";

const ClassroomUpdate = ({ classroom, submit, onClose }) => {
  // 수정할 값들의 상태
  const [number, setNumber] = useState(classroom.number);
  const [name, setName] = useState(classroom.name);
  const [explanation, setExplanation] = useState(classroom.explanation);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="classroom-details__header">
          <h1 className="classroom-details__classNumber">
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </h1>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <main className="classroom-details__main">
          <ul className="classroom-details__list">
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 호실명: </strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 설명: </strong>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              ></textarea>
            </li>
          </ul>
        </main>

        <footer>
          <button className="update__cancel" onClick={onClose}>
            취소
          </button>
          <button className="update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomUpdate;
