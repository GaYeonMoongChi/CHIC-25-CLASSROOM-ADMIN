import React from "react";
import "./css/classroomDetail.css";

const DetailModal = ({ classroom, onClose }) => {
  if (!classroom) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h1 className="classroom-details__classNumber">{classroom.number}</h1>
        <div className="classroom-details__main">
          <ul className="classroom-details__list">
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 호실명: </strong>
              {classroom.name}
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">▪️ 설명: </strong>
              {classroom.explanation}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
