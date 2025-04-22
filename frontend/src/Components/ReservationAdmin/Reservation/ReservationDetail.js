import React, { useState, useEffect } from "react";
import "../css/reservationModal.css";

const ReservationDetail = ({ classroom, onClose, onUpdate }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000";

  // 모달 열릴 때 스크롤 금지되도록 설정
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 예약 정보 삭제 요청 api
  const handleDelete = async () => {};

  // 예약 정보 상세정보 모달
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="classroom-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="classroom-details__title">새빛관 102호</h1>
        </header>

        <main className="classroom-details__main">
          <ul className="classroom-details__list">
            <li className="classroom-details__item">
              <strong className="classroom-details__label">
                ▪️ 예약자명:{" "}
              </strong>
              <div className="classroom-details__content">김가연 </div>
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">
                ▪️ 예약 목적:{" "}
              </strong>
              <div className="classroom-details__content">CHIC 개강총회 </div>
            </li>
            <li className="classroom-details__item">
              <strong className="classroom-details__label">
                ▪️ 예약자 전화번호:{" "}
              </strong>
              <div className="classroom-details__content">010-5212-9619</div>
            </li>
          </ul>
        </main>

        <div className="classroom-details__update_div">
          <button className="classroom-details__delete" onClick={handleDelete}>
            예약 삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
