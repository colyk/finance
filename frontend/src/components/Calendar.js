import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import axios from "axios";

import '../styles/calendar.css'
import "react-big-calendar/lib/css/react-big-calendar.css";


axios.get('http://localhost:8000/workdays', { params: { from_month: 12, from_year: 2019, to_month: 1, to_year: 2020 } })
    .then(r => {
        alert(`Work days in month ${r.data.workDays}`)
    })
    .catch(console.log)

const localizer = momentLocalizer(moment)

class Cal extends Component {
    state = {
        events: [
            {
                start: new Date(),
                end: new Date(moment().add(1, "days")),
                title: "Some title"
            }
        ]
    };

    render() {
        return (
            <div className="planer">
                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    style={{ height: "100vh" }}
                />
            </div>
        );
    }
}

export default Cal;
