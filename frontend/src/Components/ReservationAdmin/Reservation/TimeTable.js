import React from "react";
import "../css/timelist.css";

const TimeTable = ({ reservations, loading }) => {
  console.log("timetable: ", reservations);
  return (
    <div className="timetable-div">
      {loading ? (
        <div className="loading-message">로딩 중...</div>
      ) : (
        <table className="timetable-table">
          <tbody>
            {reservations && reservations.length > 0 ? (
              reservations.map((item, index) =>
                item.reservation.map((r, subIndex) => (
                  <tr key={`${index}-${subIndex}`}>
                    {r.tag === "class" && (
                      <>
                        <td>{r.start_time}</td>
                        <td>{r.end_time}</td>
                        <td>{r.class_name}</td>
                        <td>{r.prof_name}</td>
                      </>
                    )}
                    {r.tag === "reserve" && (
                      <>
                        <td>{r.reserve_start_time}</td>
                        <td>{r.reserve_end_time}</td>
                        <td>{r.purpose}</td>
                        <td>{r.name}</td>
                      </>
                    )}
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td className="no-result" colSpan="4">
                  등록된 강의실 일정이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimeTable;
