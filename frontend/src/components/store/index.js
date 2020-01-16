import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
import cBudgetReducer from './reducers/componentBudget';

const reducers = combineReducers({
  rootReducer,
  cBudgetReducer,
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
