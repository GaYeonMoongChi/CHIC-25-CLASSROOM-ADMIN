import React, { useState } from "react";
import "../css/classroomBuilding.css";
import ClassName from "./ClassName";

const ClassDepartment = ({ classes, onUpdate }) => {
  const [openDepartments, setOpenDepartments] = useState({});

  // 단과대별 그룹핑
  const groupByDepartment = (classes) => {
    return classes.reduce((acc, classItem) => {
      const department = classItem.department || "기타";
      if (!acc[department]) acc[department] = [];
      acc[department].push(classItem);
      return acc;
    }, {});
  };

  const grouped = groupByDepartment(classes);

  const toggleDepartment = (department) => {
    setOpenDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  return (
    <>
      {Object.entries(grouped).map(([department, departmentNames]) => (
        <div key={department} className="classroom-info-update__building-block">
          <div className="classroom-info__building-header">
            <h2 className="classroom-info__building-name">📚 {department}</h2>
            <button
              className="toggle-button"
              onClick={() => toggleDepartment(department)}
            >
              {openDepartments[department] ? "▲" : "▼"}
            </button>
          </div>
          {openDepartments[department] && (
            <table className="classroom-info-update__table">
              <tbody>
                {departmentNames.map((classItem) => (
                  <ClassName
                    key={classItem.departmentName}
                    classes={classItem}
                    onUpdate={onUpdate}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </>
  );
};

export default ClassDepartment;
