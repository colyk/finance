import axios from 'axios';

export function fetch(year = 2019, country = 'PL') {
    return axios.get(`https://date.nager.at/api/v2/PublicHolidays/${year}/${country}`, { crossdomain: true })
        .then(r => {
            console.log(r.url);
        })
        .catch(error => {
            console.log(error);
        });
}
