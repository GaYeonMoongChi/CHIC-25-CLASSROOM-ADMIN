import React from "react";
import "../css/timetable.css";

const TimeTable = ({ reservations, date, building, roomId }) => {
  // 날짜 형식 변환
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  };

  const totalReservationCount = reservations.reduce(
    (acc, item) => acc + item.reservation.length,
    0
  );

  return (
    <div className="timetable-div">
      {/* 테이블 제목 */}
      <span className="table-title">
        [{building} {roomId}] {formatDate(date)} 강의실 이용 시간표
      </span>

      {/* 테이블 메인 */}
      <table className="timetable-table">
        <tbody>
          {reservations &&
          reservations.length > 0 &&
          totalReservationCount > 0 ? (
            reservations.map((item, index) => {
              // 1. 각 item의 reservation을 정렬
              const sortedReservations = [...item.reservation].sort((a, b) => {
                const aTime =
                  a.tag === "class" ? a.start_time : a.reserve_start_time;
                const bTime =
                  b.tag === "class" ? b.start_time : b.reserve_start_time;
                return aTime.localeCompare(bTime); // 문자열 시간 비교
              });

              return sortedReservations.map((r, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                  {r.tag === "class" && (
                    <>
                      <td className="time">
                        {r.start_time} - {r.end_time}
                      </td>
                      <td className="type">
                        <span className="class_type">강의</span>
                      </td>
                      <td className="title">{r.class_name}</td>
                      <td className="name">{r.prof_name}</td>
                    </>
                  )}
                  {r.tag === "reserve" && (
                    <>
                      <td className="time">
                        {r.reserve_start_time} - {r.reserve_end_time}
                      </td>
                      <td className="type">
                        <span className="reservation_type">예약</span>
                      </td>
                      <td className="title">{r.purpose}</td>
                      <td className="name">{r.name}</td>
                    </>
                  )}
                </tr>
              ));
            })
          ) : (
            <tr>
              <td className="no-result" colSpan="4">
                등록된 강의실 일정이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
