import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const StudentUpdate = ({ students, onClose }) => {
  // 수정할 값들의 상태
  const [id, setId] = useState(students.id);
  const [name, setName] = useState(students.name);
  const [phone, setPhone] = useState(students.phone);

  if (!students) return null;

  // 학생 정보 수정 요청
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/students/${id}`, { name, phone });

      if (response.status === 200) {
        alert("학생 정보가 수정되었습니다.");
        onClose(); // 학생 수정 완료시, 모달창 닫기
      } else {
        alert(response.data.message || "학생 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("학생 정보 수정 오류:", error);
      alert("학생 정보 수정 중 오류가 발생했습니다.");
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
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 학번: </strong>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="students-update__input"
                placeholder="학생의 학번을 입력하세요."
              />
            </li>
            <li className="students-update__item">
              <strong className="students-update__label">▪️ 전화번호: </strong>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="students-update__input"
                placeholder="학생의 전화번호를 입력하세요. (010-xxxx-xxxx 형식으로 입력)"
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
