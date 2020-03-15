import {
  SHOW_MODAL,
  GET_TRANSACTIONS,
  UPDATE_TRANSACTIONS,
  RESET_UPDATED_TRANSACTIONS,
} from '../constants/action-types';

const initialState = {
  showAddTransactionModal: false,
  transactions: [],
  transactionsCountPerPage: 10,
  transactionsCount: null,
  currentPage: 1,
  editingTransaction: null,
  dateRange: {
    from: null,
    to: null
  }
};

function transactionReducer(state = initialState, action) {
  if (action.type === SHOW_MODAL)
    return Object.assign({}, state, {
      showAddTransactionModal: action.payload,
      categories: state.categories,
    });

  if (action.type === GET_TRANSACTIONS)
    return {
      ...state,
      showAddTransactionModal: state.showAddTransactionModal,
      transactions: action.payload.transactions,
      transactionsCount: action.payload.count,
      currentPage: action.payload.currentPage,
      transactionsCountPerPage: action.payload.countPerPage,
      dateRange: {
        from: action.payload.dateRange.from,
        to: action.payload.dateRange.to
      }
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
