import { SET_BUDGETS } from '../constants/action-types';

const initialState = {
  budgets: [],
};

function rootReducer(state = initialState, { type, payload = [] }) {
  if (type === SET_BUDGETS) {
    return Object.assign({}, state, {
      budgets: payload,
    });
  }
  return state;
}

export default rootReducer;
