import axios from "axios";
import React, { useState } from "react";
import "../css/newReservation.css";
import Calender from "../../../Image/Calender.svg";
import ReservationDetail from "../Reservation/ReservationDetail";

const NewReservation = ({
  onClose,
  reservation = [],
  onCheck,
  fetchNewReservations,
}) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (item) => {
    setSelectedReservation(item);
    setIsDetailModalOpen(true);

    if (item.status === "new") {
      onCheck(item._id);
    }
  };

  const closeDetailModal = () => {
    setSelectedReservation(null);
    setIsDetailModalOpen(false);
  };

  // 전체 확인 버튼 클릭 시, 모든 new 예약이 checked 예약으로
  const handleCheckAll = async () => {
    const confirmed = window.confirm(
      "정말 모든 새 예약을 확인 처리하시겠습니까?"
    );
    if (!confirmed) return;

    try {
      await axios.post("/api/reserve/check-all");
      alert("모든 새 예약을 확인 처리했습니다.");

      if (fetchNewReservations) {
        fetchNewReservations();
      }
    } catch (error) {
      console.error("전체 확인 실패:", error);
      alert("전체 확인 처리 중 오류가 발생했습니다.");
    }
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

          {/* 전체 확인 버튼 */}
          {reservation.length > 0 && (
            <button
              className="new-reservation__check-all"
              onClick={handleCheckAll}
            >
              전체 확인
            </button>
          )}
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
                      {item.status === "new" && (
                        <td className="new-reservation__badge">새 예약</td>
                      )}
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
