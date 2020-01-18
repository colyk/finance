import { SET_BUDGETS, SET_CATEGORIES } from '../constants/action-types';

const initialState = {
  budgets: [],
  categories: [],
};

function rootReducer(state = initialState, { type, payload = [] }) {
  if (type === SET_BUDGETS) {
    return Object.assign({}, state, {
      budgets: payload,
    });
  }

  if (type === SET_CATEGORIES) {
    return Object.assign({}, state, {
      categories: payload,
    });
  }

  return state;
}

export default rootReducer;
