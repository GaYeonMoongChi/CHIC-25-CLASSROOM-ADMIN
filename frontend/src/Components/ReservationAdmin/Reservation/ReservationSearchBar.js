import React from "react";

const ReservationSearchBar = ({
  semester,
  semesterList,
  searchBuilding,
  searchRoom,
  searchDate,
  availableRooms,
  handleSemesterChange,
  onChangeBuilding,
  onChangeRoom,
  onChangeDate,
}) => {
  return (
    <div className="reservation-status__search">
      <ul className="reservation-status__search-list">
        <li className="reservation-status__search-item">
          <label
            htmlFor="semester-select"
            className="reservation-status__search-label"
          >
            학기
          </label>
          <select
            id="semester-select"
            className="reservation-status__search-input"
            value={semester}
            onChange={handleSemesterChange}
          >
            {semesterList.map((sem, idx) => (
              <option key={idx} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </li>

        <li className="reservation-status__search-item">
          <label
            htmlFor="building-select"
            className="reservation-status__search-label"
          >
            건물명
          </label>
          <select
            id="building-select"
            className="reservation-status__search-input"
            value={searchBuilding}
            onChange={onChangeBuilding}
          >
            <option disabled value="">
              건물을 선택하세요
            </option>
            <option value="기념관">기념관</option>
            <option value="비마관">비마관</option>
            <option value="화도관">화도관</option>
            <option value="한울관">한울관</option>
            <option value="누리관">누리관</option>
            <option value="참빛관">참빛관</option>
            <option value="새빛관">새빛관</option>
          </select>
        </li>

        <li className="reservation-status__search-item">
          <label className="reservation-status__search-label">호수</label>
          <select
            className="reservation-status__search-input"
            value={searchRoom}
            onChange={onChangeRoom}
            disabled={availableRooms.length === 0}
          >
            {availableRooms.length > 0 ? (
              availableRooms.map((room, idx) => (
                <option key={idx} value={room}>
                  {room}
                </option>
              ))
            ) : (
              <option value="">선택할 수 있는 강의실이 없습니다</option>
            )}
          </select>
        </li>

        <li className="reservation-status__search-item">
          <label className="reservation-status__search-label">날짜</label>
          <input
            type="text"
            className="reservation-status__search-input"
            placeholder="YYYY-MM-DD 형식으로 입력하세요."
            onChange={onChangeDate}
            value={searchDate}
          />
        </li>
      </ul>
    </div>
  );
};

export default ReservationSearchBar;
