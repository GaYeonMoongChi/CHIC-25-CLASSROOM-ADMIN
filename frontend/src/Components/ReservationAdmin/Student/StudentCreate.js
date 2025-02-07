import React from "react";
import "../css/classroomStudentModal.css";

const StudentCreate = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="students-create__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="students-create__title">학생 등록</h1>
        </header>

        <main className="students-create__main">
          <ul className="students-create__list">
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 이름: </strong>
              <input
                type="text"
                className="students-create__input"
                placeholder="학생의 성명을 입력하세요."
              ></input>
            </li>
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 학번: </strong>
              <input
                type="text"
                className="students-create__input"
                placeholder="학생의 학번을 입력하세요."
              ></input>
            </li>
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 전화번호: </strong>
              <input
                type="text"
                className="students-create__input"
                placeholder="학생의 전화번호를 입력하세요."
              ></input>
            </li>
          </ul>
        </main>

        <footer className="students-create__footer">
          <button className="students-create__submit" onClick={onClose}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentCreate;
