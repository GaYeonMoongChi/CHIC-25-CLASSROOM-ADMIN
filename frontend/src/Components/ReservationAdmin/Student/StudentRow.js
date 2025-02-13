import React, { useState } from "react";
import StudentDetailModal from "./StudentDetail";
import "../css/studentRow.css";

const StudentRow = ({ students }) => {
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
        />
      )}
    </>
  );
};

export default StudentRow;
