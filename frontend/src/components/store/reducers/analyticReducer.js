import { GET_ANALYTICS } from '../constants/action-types';

const initialState = {
  monthlyExpenses: null,
  monthlyIncomes: null,
  transactionsCurrentMonth: [],
};

function analyticReducer(state = initialState, action) {
  if (action.type === GET_ANALYTICS) {
    return Object.assign({}, state, {
      monthlyExpenses: action.payload.monthlyExpenses,
      monthlyIncomes: action.payload.monthlyIncomes,
      transactionsCurrentMonth: action.payload.transactionsCurrentMonth,
    });
  }

  return state;
}

export default analyticReducer;
