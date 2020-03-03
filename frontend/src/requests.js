import axios from 'axios';
import { setErrors } from './components/store/actions/index';

let url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '';

var axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  function(error) {
    if (error.response) {
      window.store.dispatch(setErrors(error.response.data.errors));
      return Promise.reject(error);
    }
    return Promise.reject({ response: { data: {} } });
  }
);

export default axiosInstance;
