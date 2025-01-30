import React, { useState } from "react";
import "../../Pages/css/Pages.css";
import "./css/classroomDelete.css";
import "../../Pages/ReservationAdmin/css/classroomInfoUpdatePage.css";
import ClassroomRow from "../../Components/ReservationAdmin/ClassroomRow";

const ClassroomDelete = ({ classroom, submit, onClose }) => {
  // 삭제할 강의실 선택 상태 관리
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  // 강의실 선택 체크박스 생성
  const toggleSelectClassroom = (number) => {
    setSelectedClassrooms((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  if (!classroom || !Array.isArray(classroom)) return null; // classroom 배열이 넘어오지 않았거나, 배열이 아닐 경우 예외 처리

  return (
    <div className="div">
      <header className="classroom-delete__header">
        <h1 className="classroom-delete__title">강의실 정보 삭제</h1>
      </header>

      <main className="classroom-delete__main">
        <table className="classroom-delete__table">
          <tbody>
            {classroom.map((classroomItem, index) => (
              <tr key={classroomItem.number}>
                <td className="classroom-delete__td">
                  <input
                    type="checkbox"
                    checked={selectedClassrooms.includes(classroomItem.number)}
                    onChange={() => toggleSelectClassroom(classroomItem.number)}
                    className="classroom-delete__checkbox"
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

      <footer className="classroom-delete__footer">
        <button className="update__cancel" onClick={onClose}>
          취소
        </button>
        <button className="classroom-delete__submit" onClick={submit}>
          완료
        </button>
      </footer>
    </div>
  );
};

export default ClassroomDelete;
