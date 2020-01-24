import { SET_BUDGETS, SET_CATEGORIES, SET_ERRORS } from '../constants/action-types';

const initialState = {
  budgets: [],
  categories: [],
  errors: []
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

  if (type === SET_ERRORS) {
    return Object.assign({}, state, {
      errors: payload,
    });
  }

  return state;
}

export default rootReducer;
