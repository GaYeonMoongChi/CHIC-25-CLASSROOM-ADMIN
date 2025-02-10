import React, { useState } from "react";
import DetailModal from "./ClassroomDetail";
import "../css/classroomRow.css";

const ClassroomRow = ({ classroom }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="classroom-info-update__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="classroom-info-update__row">
          <td className="classroom-info-update__cell">{classroom.number}</td>
        </tr>
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
