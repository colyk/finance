var axios = require('axios');

let url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';
var axiosInstance = axios.create({
  baseURL: url,
});

module.exports = axiosInstance;
