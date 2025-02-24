import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const StudentUpdate = ({ students, onClose, onUpdate }) => {
  //백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 수정할 값 상태 관리
  const [id] = useState(students.id); // id는 고유한 값이라 일단 수정 불가능하게 함.
  const [name, setName] = useState(students.name);
  const [phone, setPhone] = useState(students.phone);

  if (!students) return null;

  // 학생 정보 수정 요청
  const handleUpdate = async () => {
    if (!students.id) {
      alert("학생의 학번 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/students/${students.id}`,
        { name, phone }
      );

      if (response.status === 200) {
        alert("학생 정보가 수정되었습니다.");

        if (onUpdate) {
          onUpdate({ id: students.id, name, phone });
        }

        onClose(); // 수정 완료시 모달 닫기
      } else {
        alert(response.data.message || "학생 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("학생 정보 수정 오류:", error);
      alert("학생 정보 수정 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 수정 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

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
                placeholder="학생의 성명을 입력하세요."
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 학번: </strong>
              <input
                type="text"
                value={id}
                disabled
                className="students-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 전화번호: </strong>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="students-update__input"
                placeholder="010-xxxx-xxxx 형식으로 입력하세요."
                onKeyDown={handleKeyDown}
              />
            </li>
          </ul>
        </main>

        <footer className="students-update__footer">
          <button className="students-update__submit" onClick={handleUpdate}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentUpdate;
