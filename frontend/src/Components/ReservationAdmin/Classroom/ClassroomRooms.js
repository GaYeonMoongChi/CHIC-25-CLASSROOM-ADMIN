import React, { useState } from "react";
import DetailModal from "./ClassroomDetail";
import "../css/classroomRow.css";

const ClassroomRooms = ({ classroom, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 건물 호수 (101호, 102호 ...)*/
  return (
    <>
      <div
        className="classroom-info-update__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="classroom-info-update__row">
          <td className="classroom-info-update__cell">{classroom.room}</td>
        </tr>
      </div>

      {isModalOpen && (
        <DetailModal
          classroom={classroom}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default ClassroomRooms;
