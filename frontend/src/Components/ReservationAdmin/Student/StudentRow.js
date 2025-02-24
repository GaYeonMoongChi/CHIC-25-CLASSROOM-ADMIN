import React, { useState } from "react";
import StudentDetailModal from "./StudentDetail";
import "../css/studentRow.css";

const StudentRow = ({ students, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="student-info-update__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="student-info-update__row">
          <td className="student-info-update__cell">
            {students.id} / {students.name}
          </td>
        </tr>
      </div>

      {isModalOpen && (
        <StudentDetailModal
          students={students}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default StudentRow;
