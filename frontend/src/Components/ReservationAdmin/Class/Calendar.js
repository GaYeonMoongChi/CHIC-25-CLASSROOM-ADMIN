import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/calendar.css";

import { ko } from "date-fns/locale";

// Date 데이터를 text 형식으로 변환
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Calendar = ({ selectedDate, onChange, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actualSelectedDate = selectedDate ?? new Date();

  const handleChange = (date) => {
    if (onChange) {
      onChange(date);
    }
    if (onDateChange) {
      const formatted = formatDate(date);
      onDateChange(formatted);
    }
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className={`calendar-input-wrapper ${isOpen ? "active" : ""}`}
      onClick={onClick}
      ref={ref}
    >
      <span className="calendar-input-text">{value}</span>
    </div>
  ));

  return (
    <DatePicker
      selected={actualSelectedDate}
      onChange={handleChange}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
      locale={ko}
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
    />
  );
};

export default Calendar;
