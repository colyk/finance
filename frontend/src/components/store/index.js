import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import cBudgetReducer from './reducers/cBudgetReducer';
import transactionReducer from './reducers/transactionReducer';

const reducers = combineReducers({
  rootReducer,
  cBudgetReducer,
  transactionReducer
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
