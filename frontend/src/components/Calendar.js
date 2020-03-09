import React, { Component } from 'react';
import { Calendar as RCalendar, momentLocalizer } from 'react-big-calendar';
import { formatDate, _moment } from './utils';
import requests from '../requests';

import '../styles/calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(_moment);

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      workDays: null,
      selectedEvent: null,
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

  onSelectEvent = event => {
    let date = formatDate(event.start, 'LL');
    let title = event.title;
    this.setState({ selectedEvent: title + ' - ' + date });
    console.log(date, title);
  };

  onCloseModal = () => this.setState({ selectedEvent: null });

  render() {
    return (
      <div className="planer">
        {this.state.workDays ? (
          <div className="planer__info">
            <div>Work days: {this.state.workDays} </div>
            <div>Work hours: {this.state.workDays * 8} </div>
          </div>
        ) : (
          <div className="planer__info"></div>
        )}
        {this.state.selectedEvent ? (
          <div className="modal modal-sm active">
            <div
              className="modal-overlay"
              aria-label="Close"
              onClick={() => this.onCloseModal()}
            ></div>
            <div className="modal-container p-0">
              <div className="toast toast-primary">
                <button
                  className="btn btn-clear float-right"
                  aria-label="Close"
                  onClick={() => this.onCloseModal()}
                ></button>
                {this.state.selectedEvent}
              </div>
            </div>
          </div>
        ) : null}
        <div className="calendar">
          <RCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onNavigate={this.onNavigate}
            onSelectEvent={this.onSelectEvent}
            style={{ height: '70vh' }}
            views={['month']}
            popup={true}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
