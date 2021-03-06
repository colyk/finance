import {
  SHOW_ADD_BUDGET_MODAL,
  UPDATE_BUDGET,
  RESET_UPDATED_BUDGET,
} from '../constants/actionTypes';

const initialState = {
  showAddBudgetModal: false,
  updatedBudget: { from: null, to: null, amount: null, name: null },
};

function cBudgetReducer(state = initialState, { type, payload }) {
  if (type === SHOW_ADD_BUDGET_MODAL)
    return Object.assign({}, state, {
      showAddBudgetModal: payload,
    });

  if (type === UPDATE_BUDGET)
    return { ...state, updatedBudget: { ...state.updatedBudget, ...payload } };

  if (type === RESET_UPDATED_BUDGET)
    return Object.assign({}, state, { updatedBudget: initialState.updatedBudget });

  return state;
}

export default cBudgetReducer;
