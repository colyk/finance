import {
  SHOW_ADD_BUDGET_MODAL,
  UPDATE_BUDGET,
  RESET_UPDATED_BUDGET,
} from '../constants/actionTypes';

import requests from '../../../requests';

export function toggleAddBudgetModal(payload) {
  return { type: SHOW_ADD_BUDGET_MODAL, payload };
}

export function updateBudget(payload) {
  return { type: UPDATE_BUDGET, payload };
}

export function resetUpdatedBudget() {
  return { type: RESET_UPDATED_BUDGET };
}

export function putBudget(oldName) {
  return (dispatch, getState) => {
    const updatedBudget = getState().cBudgetReducer.updatedBudget;
    return requests.put('/budget', { ...updatedBudget, oldName });
  };
}
