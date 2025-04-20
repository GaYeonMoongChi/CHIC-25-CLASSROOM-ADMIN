import React, { useState } from "react";
import "../css/reservationModal.css";

const NewReservation = ({ onClose, reservation }) => {
  // 새 예약 알림 모달
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="new-reservation__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="new-reservation__title">새 예약</h1>
        </header>

        <main className="new-reservation__main">
          <ul className="new-reservation__list">
            <li className="new-reservation__item">
              <strong className="new-reservation__label">새빛관 102호</strong>
              <p className="new-reservation__content">예약자명~ </p>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default NewReservation;
