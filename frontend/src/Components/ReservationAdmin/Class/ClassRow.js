import React, { useState } from "react";
import DetailModal from "./ClassDetail";
import "../css/classRow.css";

const ClassRow = ({ classes, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="class-info-update__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="class-info-update__row">
          <td className="class-info-update__cell">
            {classes.class_name} / {classes.prof_name}
          </td>
        </tr>
      </div>

      {isModalOpen && (
        <DetailModal
          classes={classes}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default ClassRow;
