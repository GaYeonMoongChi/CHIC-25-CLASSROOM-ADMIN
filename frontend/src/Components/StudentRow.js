import React, { useState } from "react";
import StudentDetailModal from "./StudentDetail";
import "./css/studentRow.css";

const StudentRow = ({ students }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr>
        <td className="student-info-update__id__name">
          {students.id} / {students.name}
        </td>
        <td className="student-info-update__button">
          <button
            className="student-info-update__details-button"
            onClick={() => setIsModalOpen(true)}
          >
            상세보기
          </button>
        </td>
      </tr>

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
