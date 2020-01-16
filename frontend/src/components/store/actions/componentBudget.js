import { SHOW_MODAL, UPDATE_BUDGET, RESET_UPDATED_BUDGET } from '../constants/action-types';

import requests from '../../../requests';

export function toggleAddBudgetModal(payload) {
  return { type: SHOW_MODAL, payload };
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
    console.log(updatedBudget);
    return requests.put('/budget', { ...updatedBudget, oldName });
    // .then((response) => { dispatch(updateBudgets(response.data.budgets)) })
    // .catch((error) => { throw error })
  };
}
