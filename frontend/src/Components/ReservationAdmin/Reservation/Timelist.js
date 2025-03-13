import React from "react";
import "../css/timelist.css";
import TimeTableItem from "./TimetableItem";

const TIMELIST = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const CLASSROOMS = ["103호", "104호", "205호", "715호"];

const Timelist = ({ reservations }) => {
  return (
    <div className="timelist-div">
      <div className="timelist-container">
        {/* 강의실 헤더 */}
        <div className="time-column"></div>
        {CLASSROOMS.map((room, index) => (
          <div key={index} className="room-header">
            {room}
          </div>
        ))}

        {/* 시간 및 예약 칸 */}
        {TIMELIST.map((time, index) => (
          <React.Fragment key={index}>
            {/* 시간 표시 */}
            <div className="time-column">{time}</div>

            {/* 강의실 칸 */}
            {CLASSROOMS.map((_, roomIndex) => (
              <div key={roomIndex} className="time-slot">
                <span className="timelist-row"></span>
              </div>
            ))}
          </React.Fragment>
        ))}
        <TimeTableItem
          TIMELIST={TIMELIST}
          CLASSROOMS={CLASSROOMS}
          reservations={reservations}
        />
      </div>
    </div>
  );
};

export default Timelist;
