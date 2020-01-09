let axios = require('axios')

class workCalendar {
  constructor() {
    this.cache = null
  }

  getWeekdaysCount(start, end, freeDays = []) {
    let saturdayCode = 6;
    let sundayCode = 0;
    let dayOffCodes = [saturdayCode, sundayCode];

    let count = 0;
    let curDate = start;

    while (curDate < end) {
      if (!dayOffCodes.includes(curDate.getDay()) && !freeDays.includes(curDate.getTime()))
        count++;
      curDate.setDate(curDate.getDate() + 1);
    }

    return count;
  }

  async getHolidays(year = 2019, local = 'PL') {
    let url = `https://date.nager.at/api/v2/PublicHolidays/${year}/${local}`
    if (this.cache && this.cache.url === url)
      return Promise.resolve(this.cache);

    let res = await axios.get(url)
    this.cache = res.data
    return Promise.resolve(res.data);
  }

  async getWorkingDays({ from_month, from_year, to_month, to_year }) {
    let holidays = await this.getHolidays(from_year);
    holidays = this.parseDates(holidays);

    let start = new Date(Date.UTC(from_year, from_month));
    let end = new Date(Date.UTC(to_year, to_month));
    return this.getWeekdaysCount(start, end, holidays);
  }

  parseDates(holidays) {
    const dates = [];
    for (let holiday of holidays)
      dates.push(Date.parse(holiday.date))
    return dates;
  }
}

let wc = new workCalendar();

async function getHolidays(req, res) {
  const year = req.query.from_year;

  const holidays = await wc.getHolidays(year);
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
