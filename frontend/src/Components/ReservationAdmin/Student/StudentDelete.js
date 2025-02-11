import React, { useState } from "react";
import "../../../Pages/css/Pages.css";
import "../css/classroomStudentModal.css";
import StudentRow from "./StudentRow";

const StudentDelete = ({ students, submit, onClose }) => {
  // 삭제할 강의실 선택 상태 관리
  const [selectedStudents, setSelectedStudents] = useState([]);

  // 강의실 선택 체크박스 생성
  const toggleSelectStudents = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  if (!students || !Array.isArray(students)) return null; // students 배열이 넘어오지 않았거나, 배열이 아닐 경우 예외 처리

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="students-delete__header">
          <h1 className="students-delete__title">강의실 정보 삭제</h1>
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
          <button className="students-delete__submit" onClick={submit}>
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentDelete;
