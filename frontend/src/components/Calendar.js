import React, { Component } from 'react';
import { Calendar as RCalendar, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/en-gb';
import moment from 'moment';
import requests from '../requests';

import '../styles/calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-gb');
const localizer = momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      workDays: null,
    };

    this.onNavigate(new Date());
  }

  convertDateToRange(month, year) {
    const range = {
      from_month: month,
      from_year: year,
    };
    range.to_month = (range.from_month + 1) % 12;
    range.to_year = range.from_month > range.to_month ? range.from_year + 1 : range.from_year;
    return range;
  }

  fetchWorkDays(month, year) {
    const dateRange = this.convertDateToRange(month, year);
    requests
      .get('/workdays', { params: dateRange })
      .then(r => this.setState({ workDays: r.data.workDays }))
      .catch(console.log);
  }

  fetchHolidays(month, year) {
    const dateRange = this.convertDateToRange(month, year);

    requests
      .get('/holidays', { params: dateRange })
      .then(r => {
        let events = [];
        for (let holiday of r.data.holidays)
          events.push({
            start: new Date(holiday.date),
            end: new Date(holiday.date),
            title: holiday.localName,
          });
        this.setState({ events: events });
      })
      .catch(console.log);
  }

  onNavigate = date => {
    let year = date.getFullYear();
    let month = date.getMonth();

    this.fetchWorkDays(month, year);
    this.fetchHolidays(month, year);
  };

  render() {
    return (
      <div className="planer">
        {this.state.workDays ? (
          <div>
            <p>Work days: {this.state.workDays} </p>
            <p>Work hours: {this.state.workDays * 8} </p>
          </div>
        ) : (
          ''
        )}

        <RCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onNavigate={this.onNavigate}
          style={{ height: '95vh' }}
          views={['month']}
        />
      </div>
    );
  }
}

export default Calendar;
