import React, { useEffect } from "react";
import axios from "axios";
import "../css/reservationModal.css";
import Calender from "../../../Image/Calender.svg";

const ReservationDetail = ({ rowData, onClose, fetchNewReservations }) => {
  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000/api";

  // 모달 열릴 때 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 삭제 요청 API
  const handleDelete = async () => {
    if (window.confirm("정말로 예약을 취소하시겠습니까?")) {
      try {
        await axios.delete(`${BACKEND_URL}/reserve/${rowData._id}`);
        alert("예약이 성공적으로 삭제되었습니다.");
        onClose(); // 모달 닫기

        // 최신 상태로 UI 업데이트
        if (fetchNewReservations) {
          fetchNewReservations();
        }
      } catch (error) {
        console.error("예약 삭제 실패:", error);
        alert("예약 삭제 중 오류가 발생했습니다.");
      }
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
            <img className="calender-image" src={Calender} alt="📅" />
            {isClass ? rowData.class_name : rowData.purpose} /{" "}
            {isClass ? rowData.prof_name : rowData.professor}
          </h1>
        </header>

        <main className="reservation-details__main">
          <ul className="reservation-details__list">
            {/* 강의인 경우 */}
            {isClass && (
              <>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 이용 시간:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.timeRange}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 강의실:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.building && rowData.roomId
                      ? `${rowData.building} ${rowData.roomId}`
                      : "정보없음"}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 강의명:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.class_name}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 교수명:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.prof_name}
                  </div>
                </li>
              </>
            )}

            {/* 예약인 경우 */}
            {isReserve && (
              <>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 이용 시간:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.reserve_date} ({rowData.reserve_start_time}~
                    {rowData.reserve_end_time})
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 강의실:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.building} {rowData.roomId}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약목적:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.purpose}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약자명:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.professor ?? "정보없음"} ({rowData.student_id})
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 총 사용자 수:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.participant_count}
                  </div>
                </li>
                <li className="reservation-details__item">
                  <strong className="reservation-details__label">
                    ▪️ 예약자 연락처:
                  </strong>
                  <div className="reservation-details__content">
                    {rowData.phone ?? "정보없음"}
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
