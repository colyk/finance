import React, { Component, useState, useEffect } from 'react';
import requests from '../requests';
import DateRangePicker from './DatePickers/DateRangePicker';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import moment from 'moment';

import '../styles/budget.css';

class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBudgetAddModal: false,
      budgets: null,
    };

    this.fetchBudgets();
  }

  fetchBudgets() {
    requests
      .get('/budget')
      .then(res => {
        this.setState({ budgets: res.data.budgets });
      })
      .catch(console.log);
  }

  onShowBudgetAddModalClick = () => {
    this.setState({ showBudgetAddModal: true });
  };

  onBudgetAddModalClose = (withUpdate = false) => {
    this.setState({ showBudgetAddModal: false });
    withUpdate && this.fetchBudgets();
  };

  render() {
    return (
      <Router>
        <div className="container">
          <div className="columns">
            <div className="column col-11">
              <BudgetsTab budgets={this.state.budgets} />
            </div>
            <div className="add-btn column col-1">
              <button
                className="btn btn-action s-circle"
                onClick={this.onShowBudgetAddModalClick}
                title="Create budget"
              >
                <i className="icon icon-plus"></i>
              </button>
            </div>
          </div>
          <Switch>
            <Route path="/:budgetName" children={<BudgetsView budgets={this.state.budgets} />} />
          </Switch>

          {this.state.showBudgetAddModal ? (
            <BudgetAddModal onClose={this.onBudgetAddModalClose} />
          ) : (
            ''
          )}
        </div>
      </Router>
    );
  }
}

function BudgetsTab({ budgets }) {
  return (
    <ul className="tab">
      {budgets ? (
        budgets.map(({ name }) => (
          <li className={`tab-item`} key={name}>
            <Link to={`/${name}`}>{name}</Link>
          </li>
        ))
      ) : (
        <li className={`tab-item`}>
          <span className="active disabled">
            Create your first budget <i className="icon icon-forward"></i>
          </span>
        </li>
      )}
    </ul>
  );
}

function BudgetsView({ budgets }) {
  const { budgetName } = useParams();
  const [budget, setBudget] = useState(() => ({}));
  const initBudget = budgets ? budgets.find(b => b.name === budgetName) : {};

  useEffect(() => setBudget(initBudget || {}), [initBudget]); // trigger changing state after `[initBudget]` changes

  const formatDate = date => {
    return moment(date).format('DD-MM-YYYY');
  };
  return (
    <div>
      {budget.name ? (
        <div>
          <h3>{budget.name}</h3>
          <p>Start date: {formatDate(budget.from)}</p>
          <p>End date: {formatDate(budget.to)}</p>
          <p>Goal amount: {budget.goal_amount}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function BudgetAddModal({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [amount, setAmount] = useState(null);
  const [name, setName] = useState(null);

  const [active, toggleModal] = useState(true);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onCreateClick = e => {
    requests
      .post('/budget', { from: startDate, to: endDate, amount, name })
      .then(res => {
        toggleModal(false);
        onClose(true);
      })
      .catch(console.log);
  };

  return (
    <div className={`modal ${active ? 'active' : ''}`} id="budget-modal--add">
      <div
        className="modal-overlay"
        onClick={() => {
          toggleModal(false);
          onClose();
        }}
      />
      <div className="modal-container" role="document">
        <div className="modal-header">
          <div className="modal-title h5">Budget creating form</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <form>
              <div className="form-group">
                <label className="form-label" htmlFor="budget-modal__name">
                  Budget name
                </label>
                <input
                  className="form-input"
                  id="budget-modal__name"
                  type="text"
                  placeholder="Year budget"
                  onChange={e => setName(e.target.value)}
                />
                <label className="form-label" htmlFor="budget-modal__date-range">
                  Date range
                </label>
                <div id="budget-modal__date-range">
                  <DateRangePicker onChange={handleDatesChange} />
                </div>
                <label className="form-label" htmlFor="budget-modal__amount">
                  Goal budget amount
                </label>
                <input
                  className="form-input"
                  id="budget-modal__amount"
                  type="text"
                  placeholder="0.00"
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-link mr-2"
            onClick={() => {
              toggleModal(false);
              onClose();
            }}
          >
            Close
          </button>
          <button className="btn btn-primary" onClick={onCreateClick}>
            Create budget
          </button>
        </div>
      </div>
    </div>
  );
}

export default Budget;
