import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const ClassroomCreate = ({ onClose, onCreate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 강의실 입력값 상태 관리
  const [classroomData, setClassroomData] = useState({
    classroom_idx: "",
    classroom_name: "",
    classroom_exp: "",
  });

  // 강의실 입력값 변경 핸들러
  const handleChange = (e) => {
    setClassroomData({ ...classroomData, [e.target.name]: e.target.value });
  };

  // 강의실 등록 요청
  const handleSubmit = async () => {
    // 모든 항목이 채워지지 않았을 경우 예외처리
    if (
      !classroomData.classroom_idx ||
      !classroomData.classroom_name ||
      !classroomData.classroom_exp
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/classrooms`,
        classroomData
      );
      alert("강의실 등록이 완료되었습니다.");

      if (onCreate) {
        onCreate(response.data);
      }

      handleClose();
    } catch (error) {
      console.error("강의실 등록 오류:", error);
      alert("강의실 등록에 실패했습니다.");
    }
  };

  const handleClose = () => {
    setClassroomData({
      classroom_idx: "",
      classroom_name: "",
      classroom_exp: "",
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-create__title">강의실 등록</h1>
        </header>

        <main className="classroom-create__main">
          <ul className="classroom-create__list">
            <li className="classroom-create__item">
              <strong className="classroom-create__label">
                ▪️ 강의실 호수:{" "}
              </strong>
              <input
                type="text"
                name="classroom_idx"
                className="classroom-create__input"
                placeholder="강의실 호수를 입력하세요. (ex.103)"
                onChange={handleChange}
              ></input>
            </li>
            <li className="classroom-create__item">
              <strong className="classroom-create__label">▪️ 강의실명: </strong>
              <input
                type="text"
                name="classroom_name"
                className="classroom-create__input"
                placeholder="강의실명을 입력하세요. (ex.정보융합학부 강의실)"
                onChange={handleChange}
              ></input>
            </li>
            <li className="classroom-create__item">
              <strong className="classroom-create__label">
                ▪️ 강의실 설명:{" "}
              </strong>
              <textarea
                name="classroom_exp"
                className="classroom-create__textarea"
                placeholder="강의실 설명을 입력하세요. (ex.일반 PC가 50대 구비되어 있습니다.)"
                onChange={handleChange}
              ></textarea>
            </li>
          </ul>
        </main>

        <footer className="classroom-create__footer">
          <button className="classroom-create__submit" onClick={handleSubmit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomCreate;
