import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const StudentCreate = ({ onClose, onCreate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 등록할 내용 상태 관리
  const [studentData, setStudentData] = useState({
    name: "",
    id: "",
    phone: "",
  });

  // 학생 정보 등록 요청
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!studentData.name || !studentData.id || !studentData.phone) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (!/^\d{10}$/.test(studentData.id)) {
      alert("ID는 10자리 숫자로 입력해야 합니다.");
      return;
    }

    if (!/^010-\d{4}-\d{4}$/.test(studentData.phone)) {
      alert("전화번호는 010-0000-0000 형식이어야 합니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/students`,
        studentData
      );
      alert("학생 등록이 완료되었습니다.");

      if (onCreate) {
        onCreate(response.data);
      }

      handleClose();
    } catch (error) {
      console.error("학생 등록 오류:", error);
      alert("학생 등록에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setStudentData({ name: "", id: "", phone: "" });
    onClose();
  };

  // 엔터키 눌러도 등록 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
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
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="students-create__item">
              <strong className="students-create__label">▪️ 전화번호: </strong>
              <input
                type="text"
                name="phone"
                className="students-create__input"
                placeholder="학생의 전화번호를 입력하세요. (010-xxxx-xxxx 형식으로 입력)"
                value={studentData.phone}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
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
