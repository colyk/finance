import { SET_BUDGETS } from '../constants/action-types';

const initialState = {
  budgets: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_BUDGETS) {
    return Object.assign({}, state, {
      budgets: action.payload,
    });
  }
  return state;
}

export default rootReducer;
