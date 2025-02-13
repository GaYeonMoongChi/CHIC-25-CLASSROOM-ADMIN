import React, { useState } from "react";
import axios from "axios";
import "../../../Pages/css/Pages.css";
import "../css/classroomStudentModal.css";
import StudentRow from "./StudentRow";

const StudentDelete = ({ students, onClose }) => {
  // 삭제할 학생 선택 상태 관리
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
      const response = await axios.delete("/api/students", {
        data: { studentIds: selectedStudents },
      });

      alert(response.data.message || "학생 삭제가 완료되었습니다.");
      onClose();
    } catch (error) {
      console.error("학생 삭제 오류:", error);
      alert("학생 삭제 중 오류가 발생했습니다.");
    }
  };

  if (!students || !Array.isArray(students)) return null; // students 배열이 없거나 배열이 아닐 경우 예외 처리

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
                {students.map((studentItem, index) => (
                  <tr key={studentItem.id}>
                    <StudentRow key={index} students={studentItem} />
                    <td className="students-delete__td">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(studentItem.id)}
                        onChange={() => toggleSelectStudents(studentItem.id)}
                        className="students-delete__checkbox"
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
