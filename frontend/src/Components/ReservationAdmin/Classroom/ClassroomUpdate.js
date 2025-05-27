import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/reservationModal.css";
import School from "../../../Image/School.svg";

const ClassroomUpdate = ({ classroom, onClose, onUpdate }) => {
  const BACKEND_URL = "http://localhost:8000";

  // 모달 열릴 때 스크롤 금지되도록 설정
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 수정할 값들의 상태
  const [classroomData, setClassroomData] = useState({
    building: "",
    room: "",
    equipment: "",
    minNumberOfUsers: "",
    contactDepartment: "",
    contactLocation: "",
    contactNumber: "",
  });

  // prop 들어올 때 상태 초기화
  useEffect(() => {
    if (classroom) {
      setClassroomData({
        building: classroom.building || "",
        room: classroom.room || "",
        equipment: classroom.equipment || "",
        minNumberOfUsers: classroom.minNumberOfUsers || "",
        contactDepartment: classroom.contactDepartment || "",
        contactLocation: classroom.contactLocation || "",
        contactNumber: classroom.contactNumber || "",
      });
    }
  }, [classroom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassroomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!classroom) {
      alert("강의실 데이터가 조회되지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/classroom/${classroom.building}/${classroom.room}`,
        classroomData
      );

      if (response.status === 200) {
        alert("강의실 정보가 수정되었습니다.");
        if (onUpdate) onUpdate(response.data);
        onClose();
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
    if (e.key === "Enter") handleUpdate();
  };

  if (!classroom) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="classroom-update__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-update__title">
            <img className="book-image" src={School} alt="📖" />
            강의실 수정
            <span className="classroom-update__submit_span">
              <button
                className="classroom-update__submit"
                onClick={handleUpdate}
              >
                완료
              </button>
            </span>
          </h1>
        </header>

        <main className="classroom-update__main">
          <ul className="classroom-update__list">
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 건물명 </strong>
              <input
                type="text"
                name="building"
                value={classroomData.building}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 호수 </strong>
              <input
                type="text"
                name="room"
                value={classroomData.room}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>

            <li className="classroom-update__item">
              <strong className="classroom-update__label">
                ▪️ 관리부서 / 학과{" "}
              </strong>
              <input
                type="text"
                name="contactDepartment"
                value={classroomData.contactDepartment}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 수용인원 </strong>
              <input
                type="text"
                name="minNumberOfUsers"
                value={classroomData.minNumberOfUsers}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 장비 </strong>
              <input
                type="text"
                name="equipment"
                value={classroomData.equipment}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 전화번호 </strong>
              <input
                type="text"
                name="contactNumber"
                value={classroomData.contactNumber}
                onChange={handleChange}
                className="classroom-update__input"
                onKeyDown={handleKeyDown}
              />
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ClassroomUpdate;
