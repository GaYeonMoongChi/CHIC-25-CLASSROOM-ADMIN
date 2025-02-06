import React, { useState } from "react";
import DetailModal from "./ClassroomDetail";
import "../css/classroomRow.css";

const ClassroomRow = ({ classroom }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <tr>
        <td className="classroom-info-update__name">{classroom.number}</td>
        <td className="classroom-info-update__button">
          <button
            className="classroom-info-update__details-button"
            onClick={() => setIsModalOpen(true)}
          >
            상세 보기
          </button>
        </td>
      </tr>

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
