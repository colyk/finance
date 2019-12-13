var axios = require('axios');

function fetch(year=2019, country='PL') {
    axios.get('https://date.nager.at/api/v2/PublicHolidays/{year}/{country}')
        .then(r => {
            console.log(r.url);
        }).catch(error => {
            console.log(error);
    });
}

module.exports = fetch;