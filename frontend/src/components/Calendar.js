import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import requests from '../requests';

import '../styles/calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class Cal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      workDays: null,
    };
    this.fetchWorkDays();
    this.fetchHolidays();
  }

  fetchWorkDays() {
    requests
      .get('/workdays', { params: { from_month: 11, from_year: 2019, to_month: 0, to_year: 2020 } })
      .then(r => {
        console.log(r.data);
        this.setState({ workDays: r.data.workDays });
      })
      .catch(console.log);
  }

  fetchHolidays() {
    requests
      .get('/holidays', { params: { from_month: 11, from_year: 2019, to_month: 0, to_year: 2020 } })
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

        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: '95vh' }}
        />
      </div>
    );
  }
}

export default Cal;
