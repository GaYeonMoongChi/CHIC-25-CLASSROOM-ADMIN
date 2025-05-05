import React, { useState, useEffect } from "react";
import "../css/reservationModal.css";

const ReservationDetail = ({ rowData, onClose }) => {
  // 모달 열릴 때 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 삭제 API (추후 요청코드 작성 예정)
  const handleDelete = async () => {
    if (window.confirm("정말로 예약을 취소하시겠습니까?")) {
      console.log("예약 삭제 로직 실행");
    }
  };

  const isClass = rowData.tag === "class";
  const isReserve = rowData.tag === "reserve";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="reservation-details__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="reservation-details__title">
            {isClass ? rowData.class_name : rowData.purpose}
          </h1>
        </header>

        <main className="reservation-details__main">
          <ul className="reservation-details__list">
            {/* 공통: 강의실 빌딩 / 호수 */}
            <li className="reservation-details__item">
              <strong className="reservation-details__label">▪️ 강의실:</strong>
              <div className="reservation-details__content">
                {rowData.building} {rowData.roomId}
              </div>
            </li>

            {/* 강의인 경우 */}
            {isClass && (
              <>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 교수명:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.prof_name}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 강의 시간:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.start_time} - {rowData.end_time}
                  </div>
                </li>
              </>
            )}

            {/* 예약인 경우 */}
            {isReserve && (
              <>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약자명:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.name}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약자 전화번호:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.phone ?? "-"}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약 시간:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.reserve_start_time} - {rowData.reserve_end_time}
                  </div>
                </li>
              </>
            )}
          </ul>
        </main>

        {/* 예약일 때만 예약 삭제 버튼 표시 */}
        {isReserve && (
          <div className="reservation-details__update_div">
            <button
              className="reservation-details__delete"
              onClick={handleDelete}
            >
              예약 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationDetail;
