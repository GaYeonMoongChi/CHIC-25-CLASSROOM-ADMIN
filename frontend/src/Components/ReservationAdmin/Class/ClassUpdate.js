import React, { useState } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const ClassUpdate = ({ classes, submit, onClose, onUpdate }) => {
  //백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 수정할 값들의 상태
  const [class_idx] = useState(classes.class_idx);
  const [class_name, setClassName] = useState(classes.class_name);
  const [classroom_idx, setClassroomIdx] = useState(classes.classroom_idx);
  const [class_credit, setClassCredit] = useState(classes.class_credit);
  const [prof_name, setProfName] = useState(classes.prof_name);
  const [class_daytime, setClassDaytime] = useState(classes.class_daytime);

  // 학생 정보 수정 요청
  const handleUpdate = async () => {
    if (!classes.class_idx) {
      alert("강의 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/classes/${classes.class_idx}`,
        {
          classroom_idx,
          class_name,
          prof_name,
          class_credit,
          class_daytime,
        }
      );

      if (response.status === 200) {
        alert("학생 정보가 수정되었습니다.");

        if (onUpdate) {
          onUpdate({
            classroom_idx,
            class_name,
            prof_name,
            class_credit,
            class_daytime,
          });
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

  if (!classes) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="class-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="class-update__title">강의 정보 수정</h1>
        </header>

        <main className="class-update__main">
          <ul className="class-update__list">
            <li className="class-create__item">
              <strong className="class-create__label">▪️ 학정번호: </strong>
              <div className="class-details__content">{class_idx}</div>
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강좌명: </strong>
              <input
                type="text"
                value={class_name}
                onChange={(e) => setClassName(e.target.value)}
                className="class-update__input"
                placeholder="강좌명을 입력하세요."
                onKeyDown={handleKeyDown}
              />
            </li>

            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강의실 호수: </strong>
              <input
                type="text"
                value={classroom_idx}
                onChange={(e) => setClassroomIdx(e.target.value)}
                className="class-update__input"
                placeholder="강의실 호수를 입력하세요. (ex.103)"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 교수명: </strong>
              <input
                type="text"
                value={prof_name}
                onChange={(e) => setProfName(e.target.value)}
                className="class-update__input"
                placeholder="교수명을 입력하세요."
                onKeyDown={handleKeyDown}
              />{" "}
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 취득학점: </strong>
              <input
                type="text"
                value={class_credit}
                onChange={(e) => setClassCredit(e.target.value)}
                className="class-update__input"
                placeholder="취득 학점을 입력하세요. (ex. 3)"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강의시간: </strong>
              <input
                type="text"
                value={class_daytime}
                onChange={(e) => setClassDaytime(e.target.value)}
                className="class-update__input"
                placeholder="강의 시간을 입력하세요. (ex. (월,1),(수,2) 형식으로 입력하세요.)"
                onKeyDown={handleKeyDown}
              />
            </li>
          </ul>
        </main>

        <footer className="class-update__footer">
          <button className="class-update__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassUpdate;
