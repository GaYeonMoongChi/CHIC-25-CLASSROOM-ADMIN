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

  // cell 한 칸의 높이
  const slotHeight = 40;

  // HEX → RGBA 변환 함수
  const hexToRgba = (hex, alpha = 0.4) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="time-table-overlay">
      {reservations.map((reservation, index) => {
        const { name, start_time, end_time, roomId, purpose } = reservation;

        // 컬러 차트
        const colorChart = [
          "#334eac",
          "#2c21a8",
          "#7096d1",
          "#5f70fc",
          "#081f5c",
          "#d0e3ff",
          "#d8dcfc",
          "#edf1f6",
          "#bad6eb",
        ];

        // item 위치 계산에 필요한 변수
        const startIndex = getTimeIndex(start_time);
        const endIndex = getTimeIndex(end_time);
        const roomIndex = getRoomIndex(roomId);

        // item의 배경색 지정
        const backgroundColor =
          (startIndex + endIndex + roomIndex) % colorChart.length;
        const backgroundColorIndex = hexToRgba(
          colorChart[backgroundColor],
          0.5
        );

        // item의 인덱스 컬러 지정
        const indexColor =
          (startIndex + endIndex + roomIndex) % colorChart.length;
        const borderLeftColor = colorChart[indexColor];

        // 위치 값 계산
        const top = startIndex * slotHeight + 269;
        const height = (endIndex - startIndex) * slotHeight;
        const width = `calc(95% / ${CLASSROOMS.length} )`;
        const left = `calc(${roomIndex} * (95% / ${CLASSROOMS.length}))`;

        return (
          <div
            key={index}
            className="reservation-item"
            style={{
              top,
              height,
              left,
              width,
              background: backgroundColorIndex,
              borderLeft: `4px solid ${borderLeftColor}`,
            }}
          >
            <ReserveItem
              name={name}
              purpose={purpose}
              start_time={start_time}
              end_time={end_time}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TimeTableItem;
