import { SET_BUDGETS } from '../constants/action-types';

export function updateBudgets(payload) {
  return { type: SET_BUDGETS, payload };
}
