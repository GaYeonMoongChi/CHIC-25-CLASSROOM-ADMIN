import React, { useState } from "react";
import "../css/newReservation.css";
import Calender from "../../../Image/Calender.svg";
import ReservationDetail from "../Reservation/ReservationDetail";

const NewReservation = ({ onClose, reservation = [], onCheck }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (item) => {
    setSelectedReservation(item);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedReservation(null);
    setIsDetailModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="new-reservation__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="new-reservation__title">
            <img className="calender-image" src={Calender} alt="📅" /> 새 예약
          </h1>
        </header>

        <main className="new-reservation__main">
          <ul className="new-reservation__list">
            {reservation.length === 0 ? (
              <p className="new-reservation__none-reservation">
                새로운 예약이 없습니다.
              </p>
            ) : (
              reservation.map((item, idx) => (
                <table key={idx} className="new-reservation__table">
                  <tbody>
                    <tr onClick={() => openDetailModal(item)}>
                      <td>{item.date}</td>
                      <td>
                        {item.building} {item.room}
                      </td>
                      <td>{item.purpose}</td>
                    </tr>
                  </tbody>
                </table>
              ))
            )}
          </ul>
        </main>

        {isDetailModalOpen && selectedReservation && (
          <ReservationDetail
            rowData={selectedReservation}
            onClose={closeDetailModal}
          />
        )}
      </div>
    </div>
  );
};

export default NewReservation;
