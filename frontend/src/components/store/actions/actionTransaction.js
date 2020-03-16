import {
  SHOW_TRANSACTION_MODAL,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  SET_PAGINATION_META,
  RESET_UPDATED_TRANSACTIONS,
} from '../constants/actionTypes';
import requests from '../../../requests';
import analyticReducer from '../reducers/analyticReducer';

export function toggleAddTransactionModal(payload) {
  return { type: SHOW_TRANSACTION_MODAL, payload };
}

export function setPaginationMeta(payload) {
  return { type: SET_PAGINATION_META, payload };
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
    const dateRange = analyticReducer.dateRange || {};
    const params = {
      page: reducer.currentPage,
      count: reducer.countPerPage,
      from: dateRange.from,
      to: dateRange.to,
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
