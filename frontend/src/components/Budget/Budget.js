import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { toggleAddBudgetModal } from '../store/actions/actionBudget';
import { fetchBudgets } from '../store/actions/index';

import BudgetAddModal from './BudgetAddModal';
import BudgetsTab from './BudgetsTab';
import BudgetsView from './BudgetsView';

import '../../styles/budget.css';

const Budget = ({ fetchBudgets, toggleAddBudgetModal }) => {
  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const onShowBudgetAddModalClick = () => {
    toggleAddBudgetModal(true);
  };

  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column col-11 col-md-10">
            <BudgetsTab />
          </div>
          <div className="add-btn column col-1 col-md-2">
            <button
              className="btn btn-action s-circle tooltip tooltip-left"
              data-tooltip="Create budget"
              onClick={onShowBudgetAddModalClick}
            >
              <i className="icon icon-plus"></i>
            </button>
          </div>
        </div>
        <Switch>
          <Route path="/:budgetName" children={<BudgetsView />} />
        </Switch>
        <BudgetAddModal />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return { showAddBudgetModal: state.cBudgetReducer.showAddBudgetModal };
};

function mapDispatchToProps(dispatch) {
  return {
    toggleAddBudgetModal: visible => dispatch(toggleAddBudgetModal(visible)),
    fetchBudgets: () => dispatch(fetchBudgets()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
