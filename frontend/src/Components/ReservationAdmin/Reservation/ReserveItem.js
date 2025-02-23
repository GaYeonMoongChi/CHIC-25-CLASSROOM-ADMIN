import React from "react";
import "../css/reserveItem.css";

const ReserveItem = ({ name, start_time, end_time, purpose }) => {
  return (
    <div className="reserve-item">
      <span className="reserve-name">{name}</span>
      <span className="reserve-time">
        {start_time} ~ {end_time}
      </span>
      <span className="reserve-purpose">{purpose}</span>
    </div>
  );
};

export default ReserveItem;
