import React from "react";
import ClassDepartment from "./ClassDepartment";
import "../css/classroomBuilding.css";

const ClassCollege = ({ classes, onUpdate }) => {
  // 단과대별 그룹핑
  const groupByCollege = (classes) => {
    return classes.reduce((acc, classes) => {
      const college = classes.college || "기타";
      if (!acc[college]) acc[college] = [];
      acc[college].push(classes);
      return acc;
    }, {});
  };

  const grouped = groupByCollege(classes);

  // 단과대명 (전정대, 인융대 ...)
  return (
    <>
      {Object.entries(grouped).map(([college, collegeNames]) => (
        <div key={college} className="classroom-info-update__building-block">
          <h2 className="classroom-info__building-name">📚 {college}</h2>
          <table className="classroom-info-update__table">
            <tbody>
              {collegeNames.map((collegeName) => (
                <ClassDepartment
                  key={collegeName.collegeName}
                  classes={collegeName}
                  onUpdate={onUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};

export default ClassCollege;
