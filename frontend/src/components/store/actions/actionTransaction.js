import {
  SHOW_TRANSACTION_MODAL,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  SET_PAGINATION_META,
  RESET_UPDATED_TRANSACTIONS,
  SET_DATE_RANGE,
} from '../constants/actionTypes';
import requests from '../../../requests';

export function toggleAddTransactionModal(payload) {
  return { type: SHOW_TRANSACTION_MODAL, payload };
}

export function setPaginationMeta(payload) {
  return { type: SET_PAGINATION_META, payload };
}

export function setDateRange(payload) {
  return { type: SET_DATE_RANGE, payload };
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

export function fetchTransactions() {
  return (dispatch, getState) => {
    const reducer = getState().transactionReducer;
    const dateRange = reducer.dateRange;
    const params = {
      page: reducer.currentPage,
      count: reducer.countPerPage,
      from: (dateRange.from || null) && dateRange.from.valueOf(),
      to: (dateRange.to || null) && dateRange.to.valueOf(),
    };
    return requests
      .get('/transaction', { params })
      .then(res => {
        dispatch(
          getTransactions({
            transactions: res.data.transactions,
            allTransactionsCount: res.data.count,
          })
        );
      })
      .catch(error => {
        throw error;
      });
  };
}
