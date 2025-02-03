import React from "react";
import "./css/classroomStudentModal.css";

const ClassroomCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>

          <h1 className="classroom-create__classNumber">강의실 등록</h1>
          <strong>▪️ 강의실 호수: </strong>
          <input
            type="text"
            className="classroom-create__input"
            placeholder="강의실 호수 입력 (ex.103)"
          ></input>
        </header>

        <main className="classroom-create__main">
          <ul className="classroom-create__list">
            <li className="classroom-create__item">
              <strong className="classroom-create__label">▪️ 강의실명: </strong>
              <input
                type="text"
                className="classroom-create__input"
                placeholder="강의실명을 입력하세요. (ex.정보융합학부 강의실)"
              ></input>
            </li>
            <li className="classroom-create__item">
              <strong className="classroom-create__label">
                ▪️ 강의실 설명:{" "}
              </strong>
              <input
                type="text"
                className="classroom-create__input"
                placeholder="강의실 설명을 입력하세요. (ex.일반 PC가 50대 구비되어 있습니다.)"
              ></input>
            </li>
          </ul>
        </main>

        <footer classroom-create__footer>
          <button className="classroom-create__cancel" onClick={onClose}>
            취소
          </button>
          <button className="classroom-create__submit" onClick={onClose}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomCreate;
