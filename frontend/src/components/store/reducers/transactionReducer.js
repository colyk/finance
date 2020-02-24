import { SHOW_MODAL, GET_TRANSACTIONS } from "../constants/action-types";

const initialState = {
  showAddTransactionModal: false,
  transactions: [],
  transactionsCountPerPage: 10,
  transactionsCount: null,
  currentPage: 1
}

function transactionReducer(state = initialState, { type, payload, count, currentPage, countPerPage }) {
  if (type === SHOW_MODAL)
    return Object.assign({}, state, {
      showAddTransactionModal: payload,
      categories: state.categories
    });

  if (type === GET_TRANSACTIONS)
    return {
      ...state,
      showAddTransactionModal: state.showAddTransactionModal,
      transactions: payload,
      transactionsCount: count,
      currentPage: currentPage,
      transactionsCountPerPage: countPerPage
    };

  return state;
};

export default transactionReducer;
