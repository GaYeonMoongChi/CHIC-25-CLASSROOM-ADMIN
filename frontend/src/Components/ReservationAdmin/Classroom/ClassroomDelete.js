import React, { useState } from "react";
import "../../../Pages/css/Pages.css";
import "../css/classroomStudentModal.css";
import ClassroomRow from "../../ReservationAdmin/Classroom/ClassroomRow";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="classroom-delete__header">
          <h1 className="classroom-delete__title">강의실 정보 삭제</h1>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="classroom-delete__main_div">
          <main className="classroom-delete__main">
            <table className="classroom-delete__table">
              <tbody>
                {classroom.map((classroomItem, index) => (
                  <tr key={classroomItem.number}>
                    <td>
                      <ClassroomRow key={index} classroom={classroomItem} />
                    </td>
                    <td className="classroom-delete__td">
                      <input
                        type="checkbox"
                        checked={selectedClassrooms.includes(
                          classroomItem.number
                        )}
                        onChange={() =>
                          toggleSelectClassroom(classroomItem.number)
                        }
                        className="classroom-delete__checkbox"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
        <footer className="classroom-delete__footer">
          <button className="classroom-delete__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassroomDelete;
