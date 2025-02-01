import React from "react";
import "./css/classroomModal.css";

const ClassroomCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>

          <h1 className="classroom-create__classNumber">
            <input
              type="text"
              className="classroom-create__input"
              placeholder="강의실 호수 입력 (ex.103)"
            ></input>
          </h1>
        </header>

        <div className="classroom-create__main">
          <ul className="classroom-create__list">
            <li className="classroom-create__item">
              <strong className="classroom-create__label">▪️ 제목: </strong>
              <input
                type="text"
                className="classroom-create__input"
                placeholder="강의실 이름 입력 (ex.정보융합학부 강의실)"
              ></input>
            </li>
            <li className="classroom-create__item">
              <strong className="classroom-create__label">▪️ 설명: </strong>
              <input
                type="text"
                className="classroom-create__input"
                placeholder="강의실 설명 입력 (ex.일반 PC가 50대 구비되어 있습니다.)"
              ></input>
            </li>
          </ul>

          <button className="classroom-create__submit" onClick={onClose}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCreate;
