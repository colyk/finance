let axios = require('axios')
const User = require('../models/User');
const bcrypt = require('bcrypt');

class workCalendar {
    constructor() { }

    getWeekdaysCount(start, end, freedays = []) {
        let saturdayCode = 6;
        let sundayCode = 0;
        let dayOffCodes = [saturdayCode, sundayCode];

        let count = 0;
        let curDate = start;

        while (curDate < end) {
            if (!dayOffCodes.includes(curDate.getDay()) && !freedays.includes(curDate.getTime()))
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }

        return count;
    }

    async getWorkingDays({ from_month, from_year, to_month, to_year }) {
        let res = await axios.get(`https://date.nager.at/api/v2/PublicHolidays/2019/PL`)
        let data = res.data;

        let start = new Date(from_year, from_month);
        let end = new Date(to_year, to_month);
        let freedays = this.parseDates(data);
        let weekdaysCount = this.getWeekdaysCount(start, end, freedays);
        return weekdaysCount;

    }

    parseDates(holidays) {
        const dates = [];

        for (let holiday of holidays)
            dates.push((new Date(holiday.date)).getTime())
        return dates;
    }
}



let wc = new workCalendar();

async function getHolidays(req, res) { }

async function getWorkdays(req, res) {
    const query = req.query;

    const workDays = await wc.getWorkingDays(query);
    return res.status(200).json({ workDays });
}


module.exports = {
    getHolidays,
    getWorkdays
}
