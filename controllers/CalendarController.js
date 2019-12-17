let axios = require('axios')
const User = require('../models/User');
const bcrypt = require('bcrypt');

class workCalendar {
    constructor() {
        this.cache = null
    }

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

    async getHolidays(year = 2019, local = 'PL') {
        if (this.cache)
            return Promise.resolve(this.cache);
        let url =`https://date.nager.at/api/v2/PublicHolidays/${year}/${local}`
        let res = await axios.get(url)
        this.cache = res.data
        return Promise.resolve(res.data);
    }

    /**
     * Moth range 0 - 11
     */
    async getWorkingDays({ from_month, from_year, to_month, to_year }) {
        let data = await this.getHolidays();
        let freedays = this.parseDates(data);

        let start = new Date(Date.UTC(from_year, from_month));
        let end = new Date(Date.UTC(to_year, to_month));
        let weekdaysCount = this.getWeekdaysCount(start, end, freedays);
        return weekdaysCount;
    }

    parseDates(holidays) {
        const dates = [];

        for (let holiday of holidays)
            dates.push(Date.UTC(holiday.date))
        return dates;
    }
}

let wc = new workCalendar();

async function getHolidays(req, res) {
    const query = req.query;

    const holidays = await wc.getHolidays();
    return res.status(200).json({ holidays: holidays });
}

async function getWorkdays(req, res) {
    const query = req.query;

    const workDays = await wc.getWorkingDays(query);
    return res.status(200).json({ workDays });
}


module.exports = {
    getHolidays,
    getWorkdays
}
