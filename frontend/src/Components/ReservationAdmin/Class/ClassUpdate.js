import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/reservationModal.css";

const ClassUpdate = ({ classes, onClose, onUpdate, semester }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000/api/class";

  // 수정할 값들의 상태
  const [classData, setClassData] = useState({
    class_idx: classes.class_idx,
    class_name: classes.class_name,
    class_credit: classes.class_credit,
    classroom_idx: classes.classroom_idx,
    prof_name: classes.prof_name,
    class_daytime: classes.class_daytime,
  });

  // prop 들어올 때 상태 초기화
  useEffect(() => {
    if (classes) {
      setClassData({
        class_idx: classes.class_idx || "",
        class_name: classes.class_name || "",
        class_credit: classes.class_credit || "",
        classroom_idx: classes.classroom_idx || "",
        prof_name: classes.prof_name,
        class_daytime: classes.class_daytime || "",
      });
    }
  }, [classes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prev) => ({ ...prev, [name]: value }));
  };

  // 학생 정보 수정 요청
  const handleUpdate = async () => {
    if (!classes.class_idx) {
      alert("강의 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/${semester}/${classes.class_idx}`,
        classData
      );

      if (response.status === 200) {
        alert("학생 정보가 수정되었습니다.");
        if (onUpdate) {
          onUpdate(classData, null);
        }
        onClose();
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="class-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="class-update__title">강의 정보 수정</h1>
        </header>

        <main className="class-update__main">
          <ul className="class-update__list">
            <li className="class-create__item">
              <strong className="class-update__label">▪️ 학정번호: </strong>
              <div className="class-details__content">
                {classData.class_idx}
              </div>
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강좌명: </strong>
              <input
                type="text"
                value={classData.class_name}
                name="class_name"
                onChange={handleChange}
                className="class-update__input"
                placeholder="강좌명을 입력하세요."
                onKeyDown={handleKeyDown}
              />
            </li>

            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강의실 호수: </strong>
              <input
                type="text"
                value={classData.classroom_idx}
                name="classroom_idx"
                onChange={handleChange}
                className="class-update__input"
                placeholder="강의실 호수를 입력하세요. (ex.103)"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 교수명: </strong>
              <input
                type="text"
                value={classData.prof_name}
                name="prof_name"
                onChange={handleChange}
                className="class-update__input"
                placeholder="교수명을 입력하세요."
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 취득학점: </strong>
              <input
                type="text"
                value={classData.class_credit}
                name="class_credit"
                onChange={handleChange}
                className="class-update__input"
                placeholder="취득 학점을 입력하세요. (ex. 3)"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="class-update__item">
              <strong className="class-update__label">▪️ 강의시간: </strong>
              <input
                type="text"
                value={classData.class_daytime}
                name="class_daytime"
                onChange={handleChange}
                className="class-update__input"
                placeholder="강의 시간을 입력하세요. (ex. 월,1,수2 형식으로 입력하세요.)"
                onKeyDown={handleKeyDown}
              />
            </li>
          </ul>

          <div className="class-update__submit_div">
            <button className="class-update__submit" onClick={handleUpdate}>
              완료
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassUpdate;
