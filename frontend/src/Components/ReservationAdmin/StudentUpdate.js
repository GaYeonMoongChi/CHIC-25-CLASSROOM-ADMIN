import React, { useState } from "react";
import "./css/classroomStudentModal.css";

const StudentUdpate = ({ students, submit, onClose }) => {
  // 수정할 값들의 상태
  const [id, setId] = useState(students.id);
  const [name, setName] = useState(students.name);
  const [number, setNumber] = useState(students.number);

  if (!students) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="students-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="students-update__title">학생 정보 수정</h1>
        </header>

        <main className="students-update__main">
          <ul className="students-update__list">
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 이름: </strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="students-update__input"
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 학번: </strong>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="students-update__input"
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 전화번호: </strong>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="students-update__textarea"
              ></input>
            </li>
          </ul>
        </main>

        <footer className="students-update__footer">
          <button className="students-update__cancle" onClick={onClose}>
            취소
          </button>
          <button className="students-update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentUdpate;
