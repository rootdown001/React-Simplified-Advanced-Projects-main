import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useEffect, useState } from "react";

export default function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="date-picker-container">
        <button
          className="date-picker-button"
          onClick={() => setIsOpen((o) => !o)}
        >
          {value == null ? "Select Date" : format(value, "MMMM do, yyyy")}
        </button>
        {isOpen && <DatePickerModal value={value} onChange={onChange} />}
      </div>
    </>
  );
}

function DatePickerModal({ value, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date());

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  useEffect(() => {
    console.log("value: ", value);
  }, [value]);

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          onClick={() => setVisibleMonth((m) => subMonths(m, 1))}
          className="prev-month-button month-button"
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, "LLLL '-' yyyy")}
        </div>
        <button
          onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
          className="next-month-button month-button"
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map((date) => {
          const today = isToday(date);

          return (
            <button
              key={date.toDateString()}
              onClick={() => onChange(date)}
              className={`date ${
                format(date, "MMMM") !== format(visibleMonth, "MMMM")
                  ? "date-picker-other-month-date"
                  : ""
              } ${isSameDay(date, value) && "selected"} ${
                today ? "today" : ""
              }`}
            >
              {getDate(date)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
