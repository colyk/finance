import { SET_BUDGETS, SET_CATEGORIES, SET_ERRORS } from '../constants/actionTypes';

import requests from '../../../requests';

export function updateBudgets(payload) {
  return { type: SET_BUDGETS, payload };
}

export function updateCategories(payload) {
  return { type: SET_CATEGORIES, payload };
}

export function setErrors(payload) {
  return { type: SET_ERRORS, payload };
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

export function fetchCategories() {
  return dispatch => {
    return requests
      .get('/category')
      .then(response => {
        dispatch(updateCategories(response.data.categories));
      })
      .catch(error => {
        throw error;
      });
  };
}
