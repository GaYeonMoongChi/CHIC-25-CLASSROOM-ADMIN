import React, { useState } from "react";
import DetailModal from "./ClassDetail";
import "../css/className.css";

const ClassName = ({ classes, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ClassDepartment 컴포넌트에서 학과를 그룹핑 한 것에 따라 강의들을 분류하기
  return (
    <>
      <tr
        className="class-info-update__row"
        onClick={() => setIsModalOpen(true)}
      >
        <td className="class-info-update__cell">
          {classes.class_name} ({classes.prof_name})
        </td>
      </tr>

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
