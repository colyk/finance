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

export function fetchTransactions(currentPage, countPerPage, dateRange) {
  return dispatch => {
    return requests
      .get('/transaction?page=' + currentPage + '&count=' + countPerPage + '&from=' + dateRange.from + '&to=' + dateRange.to)
      .then(res => {
        dispatch(
          getTransactions({
            transactions: res.data.transactions,
            count: res.data.count,
            currentPage: currentPage,
            countPerPage: countPerPage,
            dateRange: {
              from: dateRange.from,
              to: dateRange.to,
            }
          })
        );
      })
      .catch(error => {
        throw error;
      });
  };
}
