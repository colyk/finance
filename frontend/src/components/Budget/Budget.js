import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateBudgets } from '../store/actions/index';

import requests from '../../requests';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import moment from 'moment';

import '../../styles/budget.css';
import { BudgetAddModal } from './BudgetAddModal';
import BudgetsTab from './BudgetsTab';
import BudgetsView from './BudgetsView';

moment.locale('en-gb');

const Budget = ({ budgets, updateBudgets }) => {
  const [showBudgetAddModal, setShowBudgetAddModal] = useState(false);
  // eslint-disable-next-line
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    requests
      .get('budgets')
      .then(res => {
        updateBudgets(res.data.budgets);
      })
      .catch(console.log);
  };

  const onShowBudgetAddModalClick = () => {
    setShowBudgetAddModal(true);
  };

  const onBudgetAddModalClose = (withUpdate = false) => {
    setShowBudgetAddModal(false);
    if (withUpdate) fetchBudgets();
  };

  const onBudgetUpdate = () => {
    fetchBudgets();
  };

  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column col-11">
            <BudgetsTab budgets={budgets} />
          </div>
          <div className="add-btn column col-1">
            <button
              className="btn btn-action s-circle tooltip tooltip-left"
              onClick={onShowBudgetAddModalClick}
              data-tooltip="Create budget"
            >
              <i className="icon icon-plus"></i>
            </button>
          </div>
        </div>
        <Switch>
          <Route path="/:budgetName" children={<BudgetsView onBudgetUpdate={onBudgetUpdate} />} />
        </Switch>

        {showBudgetAddModal ? <BudgetAddModal onClose={onBudgetAddModalClose} /> : ''}
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return { budgets: state.budgets };
};

function mapDispatchToProps(dispatch) {
  return {
    updateBudgets: budgets => dispatch(updateBudgets(budgets)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
