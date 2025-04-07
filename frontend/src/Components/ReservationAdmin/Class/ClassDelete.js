import React, { useState } from "react";
import axios from "axios";
import "../../../Pages/css/Pages.css";
import "../css/reservationModal.css";
import ClassRow from "../../ReservationAdmin/Class/ClassRow";

const ClassDelete = ({ classes, onClose, onDelete }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 삭제할 강의 선택 상태 관리
  const [selectedClass, setSelectedClass] = useState([]);

  // 강의 선택 체크박스 생성
  const toggleSelectClass = (number) => {
    setSelectedClass((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };

  // 강의 삭제 요청
  const handleDelete = async () => {
    if (setSelectedClass.length === 0) {
      alert("삭제할 강의을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/classes`, {
        data: { ids: setSelectedClass },
      });

      alert(response.data.message || "강의 삭제가 완료되었습니다.");

      if (onDelete) {
        onDelete(setSelectedClass);
      }

      onClose();
    } catch (error) {
      console.error("강의 삭제 오류:", error);
      alert("강의 삭제 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 등록 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleDelete();
    }
  };

  if (!classes || !Array.isArray(classes)) return null; // class 배열이 넘어오지 않았거나, 배열이 아닐 경우 예외 처리

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="class-delete__header">
          <h1 className="class-delete__title">강의 정보 삭제</h1>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>

        <div className="class-delete__main_div">
          <main className="class-delete__main">
            <table className="class-delete__table">
              <tbody>
                {classes.map((classItem, index) => (
                  <tr key={classItem.class_idx}>
                    <td>
                      <ClassRow key={index} class={classItem} />
                    </td>
                    <td className="class-delete__td">
                      <input
                        type="checkbox"
                        checked={selectedClass.includes(classItem.class_idx)}
                        onChange={() => toggleSelectClass(classItem.class_idx)}
                        className="class-delete__checkbox"
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>
        <footer className="class-delete__footer">
          <button className="class-delete__submit" onClick={handleDelete}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ClassDelete;
