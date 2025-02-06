import React, { useState } from "react";
import StudentDetailModal from "./StudentDetail";
import "./css/studentRow.css";

const StudentRow = ({ students }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="student-info-update__row_div">
        <tr className="student-info-update__row">
          <td className="student-info-update__cell">
            {students.id} / {students.name}
          </td>
        </tr>

        <button
          className="student-info-update__details-button"
          onClick={() => setIsModalOpen(true)}
        >
          상세보기
        </button>
      </div>

      {isModalOpen && (
        <StudentDetailModal
          students={students}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default StudentRow;
