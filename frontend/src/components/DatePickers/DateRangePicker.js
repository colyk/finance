import React, { useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker as RDDateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

/* <DateRangePicker onChange={range => console.log(range)}/> */
function DateRangePicker({ onChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="App">
      <RDDateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        numberOfMonths={window.innerWidth < 600 ? 1 : 2}
        onDatesChange={range => {
          handleDatesChange(range);
          onChange(range);
        }}
        displayFormat="DD-MM-YYYY"
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        withFullScreenPortal={true}
        hideKeyboardShortcutsPanel
      />
    </div>
  );
}

export default DateRangePicker;
