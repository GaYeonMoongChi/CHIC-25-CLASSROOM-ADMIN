import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale"; // 한글 로캘 추가
import "react-datepicker/dist/react-datepicker.css";
import "../css/calendar.css";

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)} // 부모 상태 변경
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        className="calendar"
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              &lt;
            </button>
            <span>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              &gt;
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CalendarComponent;
