import requests from '../../../requests';

import { GET_ANALYTICS } from '../constants/action-types';

export function getAnalytics(payload) {
  return { type: GET_ANALYTICS, payload };
}

export function fetchAnalytics(month) {
  return dispatch => {
    return requests
      .get('/analytic?month=' + month)
      .then(res => {
        dispatch(getAnalytics(res.data));
      })
      .catch(error => {
        throw error;
      });
  };
}
