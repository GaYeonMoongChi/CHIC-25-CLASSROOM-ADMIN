import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const StudentCreate = ({ onClose }) => {
  // 학생 입력값 상태 관리
  const [studentData, setStudentData] = useState({
    name: "",
    id: "",
    phone: "",
  });

  // 학생 입력값 변경 핸들러
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // 학생 등록 요청
  const handleSubmit = async () => {
    if (!studentData.name || !studentData.id || !studentData.phone) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/students", studentData);
      alert("학생 등록이 완료되었습니다.");
      // console.log("학생 등록 성공:", response.data);

      // 학생 등록 성공시, 모달 닫기
      onClose();
    } catch (error) {
      console.error("학생 등록 오류:", error);
      alert("학생 등록에 실패했습니다.");
    }
  };

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
                name="name"
                className="students-create__input"
                placeholder="학생의 성명을 입력하세요."
                value={studentData.name}
                onChange={handleChange}
              />
            </li>
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 학번: </strong>
              <input
                type="text"
                name="id"
                className="students-create__input"
                placeholder="학생의 학번을 입력하세요."
                value={studentData.id}
                onChange={handleChange}
              />
            </li>
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 전화번호: </strong>
              <input
                type="text"
                name="phone"
                className="students-create__input"
                placeholder="학생의 전화번호를 입력하세요."
                value={studentData.phone}
                onChange={handleChange}
              />
            </li>
          </ul>
        </main>

        <footer className="students-create__footer">
          <button className="students-create__submit" onClick={handleSubmit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentCreate;
