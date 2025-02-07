import React, { useState } from "react";
import DetailModal from "./ClassroomDetail";
import "../css/classroomRow.css";

const ClassroomRow = ({ classroom }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="classroom-info-update__row_div">
        <tr className="classroom-info-update__row">
          <td className="classroom-info-update__cell">{classroom.number}</td>
        </tr>
        <button
          className="classroom-info-update__details-button"
          onClick={() => setIsModalOpen(true)}
        >
          상세보기
        </button>
      </div>

      {isModalOpen && (
        <DetailModal
          classroom={classroom}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ClassroomRow;
