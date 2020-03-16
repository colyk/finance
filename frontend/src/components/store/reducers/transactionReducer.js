import {
  SHOW_TRANSACTION_MODAL,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  SET_PAGINATION_META,
  RESET_UPDATED_TRANSACTIONS,
} from '../constants/actionTypes';

const initialState = {
  showAddTransactionModal: false,
  transactions: [],
  countPerPage: 10,
  currentPage: 1,
  allTransactionsCount: 0,
  editingTransaction: null,
  dateRange: {
    from: null,
    to: null,
  },
};

function transactionReducer(state = initialState, action) {
  if (action.type === SHOW_TRANSACTION_MODAL)
    return Object.assign({}, state, {
      showAddTransactionModal: action.payload,
      categories: state.categories,
    });

  if (action.type === GET_TRANSACTIONS)
    return {
      ...state,
      ...action.payload,
    };

  if (action.type === SET_PAGINATION_META)
    return {
      ...state,
      ...action.payload,
    };

  if (action.type === UPDATE_TRANSACTIONS)
    return {
      ...state,
      showAddTransactionModal: state.showAddTransactionModal,
      editingTransaction: action.payload,
    };

  if (action.type === RESET_UPDATED_TRANSACTIONS)
    return Object.assign({}, state, { editingTransaction: initialState.editingTransaction });

  return state;
}

export default transactionReducer;
