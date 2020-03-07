import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import cBudgetReducer from './reducers/cBudgetReducer';
import transactionReducer from './reducers/transactionReducer';
import analyticReducer from './reducers/analyticReducer';

const reducers = combineReducers({
  rootReducer,
  cBudgetReducer,
  transactionReducer,
  analyticReducer,
});

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
