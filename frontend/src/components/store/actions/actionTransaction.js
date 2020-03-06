import { SHOW_MODAL, GET_TRANSACTIONS } from '../constants/action-types';
import requests from '../../../requests';

export function toggleAddTransactionModal(payload) {
  return { type: SHOW_MODAL, payload };
}

export function getTransactions(payload, count, currentPage, countPerPage) {
  return { type: GET_TRANSACTIONS, payload, count, currentPage, countPerPage };
}

export function fetchTransactions(currentPage, countPerPage) {
  return dispatch => {
    return requests
      .get('/transaction?page=' + currentPage + '&count=' + countPerPage)
      .then(res => {
        dispatch(getTransactions(res.data.transactions, res.data.count, currentPage, countPerPage));
      })
      .catch(error => {
        throw error;
      });
  };
}
