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
                {/* 예약시간, 사용형태, 강의명(예약명), 사용자명(교수명)*/}
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
