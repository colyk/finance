import React, { useState } from 'react';
import { SingleDatePicker as RDSingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/* <SingleDatePicker date={moment()} onChange={e => console.log(e.target.value)} /> */
function SingleDatePicker({ date, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <RDSingleDatePicker
      numberOfMonths={window.innerWidth < 600 ? 1 : 2}
      onDateChange={date => onChange({ target: { value: date } })}
      onFocusChange={({ focused }) => setFocused(focused)}
      focused={focused}
      date={date}
      displayFormat="DD-MM-YYYY"
      hideKeyboardShortcutsPanel
      withFullScreenPortal={window.innerWidth < 400}
    />
  );
}

export default SingleDatePicker;