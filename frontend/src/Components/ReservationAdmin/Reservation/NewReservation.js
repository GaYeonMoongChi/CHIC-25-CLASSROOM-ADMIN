import React from "react";
import "../css/reservationModal.css";

const NewReservation = ({ onClose, reservation = [], onCheck }) => {
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
            {reservation.length === 0 ? (
              <li className="new-reservation__item">
                <p className="new-reservation__content">
                  새로운 예약이 없습니다.
                </p>
              </li>
            ) : (
              reservation.map((item) => (
                <li key={item.id} className="new-reservation__item">
                  <strong className="new-reservation__label">
                    {item.building} {item.room}
                  </strong>
                  <p className="new-reservation__content">
                    예약자: {item.name} <br />
                    날짜: {item.date} {item.time}
                  </p>
                  <button
                    className="new-reservation__check-button"
                    onClick={() => onCheck(item.id)}
                  >
                    확인
                  </button>
                </li>
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default NewReservation;
