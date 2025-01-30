import React, { useState } from "react";
import "../../Pages/css/Pages.css";
import "../../Pages/ReservationAdmin/css/classroomInfoUpdatePage.css";
import ClassroomRow from "../../Components/ReservationAdmin/ClassroomRow";

const ClassroomDelete = ({ classroom, submit, onClose }) => {
  // 삭제할 강의실 선택 상태 관리
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  // 강의실 선택 체크박스
  const toggleSelectClassroom = (number) => {
    setSelectedClassrooms((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  if (!classroom || !Array.isArray(classroom)) return null; // 배열이 아닐 경우 예외 처리

  return (
    <div className="div">
      <header className="classroom-info-update__header">
        <h1 className="classroom-info-update__title">강의실 정보 삭제</h1>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
      </header>

      <main className="classroom-info-update__main">
        <table className="classroom-info-update__table">
          <tbody>
            {classroom.map((classroomItem, index) => (
              <tr key={classroomItem.number}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedClassrooms.includes(classroomItem.number)}
                    onChange={() => toggleSelectClassroom(classroomItem.number)}
                  />
                </td>
                <td>
                  <ClassroomRow key={index} classroom={classroomItem} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ClassroomDelete;
