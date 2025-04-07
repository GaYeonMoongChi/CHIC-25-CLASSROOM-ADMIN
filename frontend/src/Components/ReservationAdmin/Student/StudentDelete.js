import React, { useState } from "react";
import axios from "axios";
import "../../../Pages/css/Pages.css";
import "../css/reservationModal.css";
import StudentRow from "./StudentRow";

const StudentDelete = ({ students, onClose, onDelete }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 선택한 학생 상태 관리
  const [selectedStudents, setSelectedStudents] = useState([]);

  // 학생 선택 체크박스 토글
  const toggleSelectStudents = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  // 학생 삭제 요청
  const handleDelete = async () => {
    if (selectedStudents.length === 0) {
      alert("삭제할 학생을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/students`, {
        data: { ids: selectedStudents },
      });

      alert(response.data.message || "학생 삭제가 완료되었습니다.");

      if (onDelete) {
        onDelete(selectedStudents);
      }

      onClose();
    } catch (error) {
      console.error("학생 삭제 오류:", error);
      alert("학생 삭제 중 오류가 발생했습니다.");
    }
  };

  // 엔터키 눌러도 삭제 완료되게 하기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleDelete();
    }
  };

  // students 배열 못 받아올 때의 예외 처리
  if (!students || !Array.isArray(students)) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="students-delete__header">
          <h1 className="students-delete__title">학생 정보 삭제</h1>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </header>
        <div className="students-delete__main_div">
          <main className="students-delete__main">
            <table className="students-delete__table">
              <tbody>
                {students.map((studentItem) => (
                  <tr key={studentItem.id}>
                    <StudentRow students={studentItem} />
                    <td className="students-delete__td">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(studentItem.id)}
                        onChange={() => toggleSelectStudents(studentItem.id)}
                        className="students-delete__checkbox"
                        onKeyDown={handleKeyDown}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
        </div>

        <footer className="students-delete__footer">
          <button className="students-delete__submit" onClick={handleDelete}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentDelete;
