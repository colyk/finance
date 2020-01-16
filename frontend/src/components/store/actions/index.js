import { SET_BUDGETS } from '../constants/action-types';

import requests from '../../../requests';

export function updateBudgets(payload) {
  return { type: SET_BUDGETS, payload };
}

export function fetchBudgets() {
  return dispatch => {
    return requests
      .get('/budget')
      .then(response => {
        dispatch(updateBudgets(response.data.budgets));
      })
      .catch(error => {
        throw error;
      });
  };
}
