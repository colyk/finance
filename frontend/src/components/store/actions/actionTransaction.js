import {
  SHOW_MODAL,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  RESET_UPDATED_TRANSACTIONS,
} from '../constants/action-types';
import requests from '../../../requests';

export function toggleAddTransactionModal(payload) {
  return { type: SHOW_MODAL, payload };
}

export function getTransactions(payload) {
  return { type: GET_TRANSACTIONS, payload };
}

export function updateTransactions(payload) {
  return { type: UPDATE_TRANSACTIONS, payload };
}

export function resetUpdateTransactions() {
  return { type: RESET_UPDATED_TRANSACTIONS };
}

export function fetchTransactions(currentPage, countPerPage) {
  return dispatch => {
    return requests
      .get('/transaction?page=' + currentPage + '&count=' + countPerPage)
      .then(res => {
        dispatch(
          getTransactions({
            transactions: res.data.transactions,
            count: res.data.count,
            currentPage: currentPage,
            countPerPage: countPerPage,
          })
        );
      })
      .catch(error => {
        throw error;
      });
  };
}
