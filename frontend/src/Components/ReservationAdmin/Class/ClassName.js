import React, { useState } from "react";
import DetailModal from "./ClassDetail";
import "../css/className.css";

const ClassName = ({ classes, onUpdate, semester }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const className = classes.class_name?.trim()
    ? classes.class_name
    : "[[강의명 정보없음]]";
  const professorName = classes.prof_name ?? "교수명 정보없음";

  // ClassDepartment 컴포넌트에서 학과를 그룹핑 한 것에 따라 강의들을 분류하기
  return (
    <>
      <tr
        className="class-info-update__row"
        onClick={() => setIsModalOpen(true)}
      >
        <td className="class-info-update__cell">
          {className} ({professorName})
        </td>
      </tr>

      {isModalOpen && (
        <DetailModal
          classes={classes}
          onClose={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
          semester={semester}
        />
      )}
    </>
  );
};

export default ClassName;
