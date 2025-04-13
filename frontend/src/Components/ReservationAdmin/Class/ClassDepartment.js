import React from "react";
import "../css/classroomRow.css";

const ClassroomRooms = ({ classes, onUpdate }) => {
  // 학과별 그룹핑 : ClassCollege에서 그룹핑된 단과대명에 맞는 학과가 뜨게 하기.
  const groupByDepartment = (classes) => {
    return classes.reduce((acc, classes) => {
      const department = classes.department || "기타";
      if (!acc[department]) acc[department] = [];
      acc[department].push(classes);
      return acc;
    }, {});
  };

  const grouped = groupByDepartment(classes);

  /* 과 이름 (정보융합학부, 전자공학과) */
  return (
    <>
      <div className="classroom-info-update__row_div">
        <tr className="classroom-info-update__row">
          <td className="classroom-info-update__cell">{classes.department}</td>
        </tr>
      </div>
    </>
  );
};

export default ClassroomRooms;
