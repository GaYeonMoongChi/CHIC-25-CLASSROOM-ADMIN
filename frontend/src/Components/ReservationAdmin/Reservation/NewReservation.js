import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/newReservation.css";
import Calender from "../../../Image/Calender.svg";
import ReservationDetail from "../Reservation/ReservationDetail";
import Doorbell from "../../../Image/Doorbell.svg";
import Exclamation from "../../../Image/Exclamation.svg";

const NewReservation = ({
  onClose,
  reservation = [],
  onCheck,
  fetchNewReservations,
}) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 백앤드 주소
  const BACKEND_URL = "http://localhost:8000/api";

  // 하위 컴포넌트 (ReservationDetail.js)에 전송할 데이터
  const openDetailModal = (item) => {
    const formattedDate = formatDate(item.reserve_date); // 형식 수정된 date

    setSelectedReservation({
      ...item,
      tag: "reserve",
      reserve_date: formattedDate,
    });
    setIsDetailModalOpen(true);

    if (item.status === "new") {
      onCheck(item._id);
    }
  };

  const closeDetailModal = () => {
    setSelectedReservation(null);
    setIsDetailModalOpen(false);
  };

  // Date 형식 데이터 "YYYY.MM.DD" 형태로 변환
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 전체 확인 버튼 클릭 시, 모든 new 예약이 checked 예약으로
  const handleCheckAll = async () => {
    const confirmed = window.confirm(
      "정말 모든 새 예약을 확인 처리하시겠습니까?"
    );
    if (!confirmed) return;

    try {
      await axios.post(`${BACKEND_URL}/reserve/check-all`);
      alert("모든 새 예약을 확인 처리했습니다.");

      if (fetchNewReservations) {
        fetchNewReservations();
      }
    } catch (error) {
      console.error("전체 확인 실패:", error);
      alert("전체 확인 처리 중 오류가 발생했습니다.");
    }
  };

  // 예약 정렬
  const sortedReservations = [...reservation].sort((a, b) => {
    // status가 new 이면 앞에 정렬되도록
    if (a.status === "new" && b.status !== "new") return -1;
    if (a.status !== "new" && b.status === "new") return 1;

    // 최신순 정렬
    const formatDateTime = (r) => {
      const datePart = new Date(r.reserve_date).toISOString().split("T")[0];
      return new Date(`${datePart}T${r.reserve_start_time}:00`);
    };

    const dateA = formatDateTime(a);
    const dateB = formatDateTime(b);

    return dateB - dateA;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="new-reservation__header">
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
          <h1 className="new-reservation__title">
            <img className="calender-image" src={Doorbell} alt="📅" /> 새 예약
            {/* 전체 확인 버튼 */}
            {reservation.length > 0 && (
              <button
                className="new-reservation__check-all"
                onClick={handleCheckAll}
              >
                전체 확인
              </button>
            )}
          </h1>
          <p>
            <strong>!</strong> 표시가 된 새로운 예약들을 확인 해주세요. /
            현재까지 확인하지 않은 예약:{" "}
            <strong>
              {reservation.filter((item) => item.status === "new").length}
            </strong>
            개
          </p>
        </header>

        <main className="new-reservation__main">
          {reservation.length === 0 ? (
            <p className="new-reservation__none-reservation">
              새로운 예약이 없습니다.
            </p>
          ) : (
            <table className="new-reservation__table">
              <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "40%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <tbody>
                {sortedReservations.map((item, idx) => (
                  <tr key={idx} onClick={() => openDetailModal(item)}>
                    <td className="new-reservation__date">
                      <img
                        className="new-reservation__image"
                        src={Calender}
                        alt="📅"
                      />
                      {formatDate(item.reserve_date)} ({item.reserve_start_time}
                      ~{item.reserve_end_time})
                    </td>
                    <td className="new-reservation__purpose">{item.purpose}</td>
                    {item.status === "new" ? (
                      <td className="new-reservation__badge">
                        <img src={Exclamation} alt="새 예약" />
                      </td>
                    ) : (
                      <td className="new-reservation__badge"></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>

        {isDetailModalOpen && selectedReservation && (
          <ReservationDetail
            fetchNewReservations={fetchNewReservations}
            rowData={selectedReservation}
            onClose={closeDetailModal}
          />
        )}
      </div>
    </div>
  );
};

export default NewReservation;
