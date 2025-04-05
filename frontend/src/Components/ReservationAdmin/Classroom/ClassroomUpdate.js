import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/classroomStudentModal.css";

const ClassroomUpdate = ({ classroom, onClose, onUpdate }) => {
  const BACKEND_URL = "http://localhost:8000";

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
          <div className="classroom-details__title">
            <input
              type="text"
              name="building"
              value={classroomData.building}
              onChange={handleChange}
              className="classroom-update__title-input"
              onKeyDown={handleKeyDown}
            />
            <input
              type="text"
              name="room"
              value={classroomData.room}
              onChange={handleChange}
              className="classroom-update__title-input"
              onKeyDown={handleKeyDown}
            />
          </div>
        </header>

        <main className="classroom-update__main">
          <ul className="classroom-update__list">
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 호수: </strong>
              <input
                type="text"
                name="room"
                value={classroomData.room}
                onChange={handleChange}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 위치: </strong>
              <input
                type="text"
                name="contactLocation"
                value={classroomData.contactLocation}
                onChange={handleChange}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 학과: </strong>
              <input
                type="text"
                name="contactDepartment"
                value={classroomData.contactDepartment}
                onChange={handleChange}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 수용인원: </strong>
              <input
                type="text"
                name="minNumberOfUsers"
                value={classroomData.minNumberOfUsers}
                onChange={handleChange}
                className="classroom-update__input"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 비품: </strong>
              <textarea
                name="equipment"
                value={classroomData.equipment}
                onChange={handleChange}
                className="classroom-update__textarea"
              />
            </li>
            <li className="classroom-update__item">
              <strong className="classroom-update__label">▪️ 전화번호: </strong>
              <input
                type="text"
                name="contactNumber"
                value={classroomData.contactNumber}
                onChange={handleChange}
                className="classroom-update__input"
              />
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
