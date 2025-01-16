import React, { useState } from "react";
import Detail from "react-modal";
import "./ClassroomDetails.css";

const ClassroomDetails = () => {
  const [isDetailOpen, setDetailOpen] = useState(false);
  const openDetail = () => setDetailOpen(true);
  const closeDetail = () => setDetailOpen(false);

  return (
    <div className="classroom-details">
      <header className="classroom-details__header">103</header>

      <main className="classroom-details__main">
        <ul className="classroom-details__list">
          <li className="classroom-details__item">
            <strong className="classroom-details__label">호실번호: </strong>
            새빛관 103호
          </li>
          <li className="classroom-details__item">
            <strong className="classroom-details__label">호실명: </strong>
            정보융합학부실습실1
          </li>
          <li className="classroom-details__item">
            <strong className="classroom-details__label">설명: </strong>
            정보융합학부 실습실입니다. 일반 PC가 구비되어 있습니다.
          </li>
        </ul>
      </main>
    </div>
  );
};

export default ClassroomDetails;
