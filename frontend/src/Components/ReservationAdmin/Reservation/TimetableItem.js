import React from "react";
import "../css/timetableItem.css";
import ReserveItem from "./ReserveItem";

const TimeTableItem = ({ TIMELIST, CLASSROOMS, reservations }) => {
  // TIMELIST 배열에서 해당 시간의 인덱스 찾기
  const getTimeIndex = (time) =>
    TIMELIST.findIndex((t) => t?.trim() === time?.trim());

  // CLASSROOMS 배열에서 강의실의 인덱스 찾기
  const getRoomIndex = (room) =>
    CLASSROOMS.findIndex((r) => r?.trim() === room?.trim());

  return (
    <div className="time-table-overlay">
      {reservations.map((reservation, index) => {
        const { name, start_time, end_time, roomId, purpose } = reservation;

        console.log("📌reservations:", reservations);
        console.log("⏰ 예약 시간 인덱스 확인", {
          start_time,
          startIndex: getTimeIndex(start_time),
          end_time,
          endIndex: getTimeIndex(end_time),
        });

        const startIndex = getTimeIndex(start_time);
        const endIndex = getTimeIndex(end_time);
        const roomIndex = getRoomIndex(roomId);

        if (startIndex === -1 || endIndex === -1 || roomIndex === -1) {
          console.warn(
            `⚠️ 시간 또는 강의실 변환 오류: start_time=${start_time}, end_time=${end_time}, roomId=${roomId}`
          );
          return null;
        }

        // 위치 및 크기 계산
        const top = (startIndex / TIMELIST.length) * 100 + "%";
        const height = ((endIndex - startIndex) / TIMELIST.length) * 100 + "%";
        const left = (roomIndex / CLASSROOMS.length) * 100 + "%";
        const width = `calc(100% / ${CLASSROOMS.length})`;

        return (
          <div
            key={index}
            className="reservation-item"
            style={{ top, height, left, width }}
          >
            <ReserveItem name={name} purpose={purpose} />
          </div>
        );
      })}
    </div>
  );
};

export default TimeTableItem;
