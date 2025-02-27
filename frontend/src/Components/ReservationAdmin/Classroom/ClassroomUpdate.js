import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const ClassroomUpdate = ({ classroom, onClose, onUpdate }) => {
  //백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 수정할 값들의 상태
  const [number, setNumber] = useState(classroom.number);
  const [name, setName] = useState(classroom.name);
  const [explanation, setExplanation] = useState(classroom.explanation);

  // 강의실 정보 수정 요청
  const handleUpdate = async () => {
    if (!classroom.number) {
      alert("강의실 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/classrooms/${classroom.number}`,
        { number, name, explanation }
      );

      if (response.status === 200) {
        alert("강의실 정보가 수정되었습니다.");

        if (onUpdate) {
          onUpdate({ number: classroom.number, name, explanation });
        }

        onClose(); // 수정 완료시 모달 닫기
      } else {
        alert(response.data.message || "강의실 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("강의실 정보 수정 오류:", error);
      alert("강의실 정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 수정 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

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
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 호실명: </strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 설명: </strong>
              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="classroom-update__textarea"
                onKeyDown={handleKeyDown}
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="classroom-update__footer">
          <button className="classroom-update__submit" onClick={handleUpdate}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomUpdate;
