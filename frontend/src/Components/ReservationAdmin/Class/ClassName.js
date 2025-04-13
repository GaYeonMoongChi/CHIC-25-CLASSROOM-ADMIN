import React, { useState } from "react";
import DetailModal from "./ClassDetail";
import "../css/className.css";

const ClassName = ({ classes, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ClassDepartment 컴포넌트에서 학과를 그룹핑 한 것에 따라 강의들을 분류하기
  return (
    <>
      <div
        className="class-info-update__row_div"
        onClick={() => setIsModalOpen(true)}
      >
        <tr className="class-info-update__row">
          <td className="class-info-update__cell">{classes.name}</td>
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

export default ClassName;
