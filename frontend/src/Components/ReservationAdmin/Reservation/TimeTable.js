import React from "react";
import "../css/timelist.css";

const TimeTable = ({ reservations }) => {
  return (
    <div className="timetable-div">
      <table className="timetable-table">
        <tbody>
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <tr key={index}>
                {/* 예약시간, 사용형태, 강의명(예약명), 사용자명(교수명) + 예약자 번호까지 표시해야 할 듯 이것도 Row 만들어가지고 Detail 모달창 새로 만들어야 되나*/}
                <td>{reservation.time}</td>
                <td>{reservation.course}</td>
                <td>{reservation.event}</td>
                <td>{reservation.username}</td>
              </tr>
            ))
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
