import React, { useState, useEffect } from 'react';
import requests from '../../requests';
import DateRangePicker from '../DatePickers/DateRangePicker';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { currencyIntl } from '../utils';
import { connect } from 'react-redux';

const BudgetsView = ({ budgets, onBudgetUpdate }) => {
  const [editable, toggleEditable] = useState(false);
  const [newBudget, updateBudget] = useState({ from: null, to: null, amount: null });
  const { budgetName } = useParams();
  const [budget, setBudget] = useState(() => ({}));
  const initBudget = budgets ? budgets.find(b => b.name === budgetName) : {};

  useEffect(() => setBudget(initBudget || {}), [initBudget]); // trigger changing state after `[initBudget]` changes

  const formatDate = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  const onRemoveClick = () => {
    requests
      .delete('/budget', { params: { name: budgetName } })
      .then(onBudgetUpdate)
      .catch(console.log);
  };

  const onEditClick = () => {
    toggleEditable(true);
  };

  const onUpdateClick = () => {
    console.log(newBudget);
    // requests
    //   .delete('budgets', { params: { name: budgetName } })
    //   .then(onBudgetUpdate)
    //   .catch(console.log);
  };

  return (
    <div>
      {budget.name ? (
        <div className="columns">
          <div className="column col-6 col-mx-auto panel">
            <div className="panel-header text-center">
              <div className="panel-title h3">{budget.name}</div>
            </div>
            <div className="panel-body">
              <DateRangeField
                editable={editable}
                label={'Date range'}
                updateBudget={updateBudget}
                date={{ from: formatDate(budget.from), to: formatDate(budget.to) }}
              />
              <AmountField
                editable={editable}
                label={'Goal amount'}
                updateBudget={updateBudget}
                amount={budget.goal_amount}
              />
            </div>
            <div className="panel-footer">
              <div className="float-right">
                {editable ? (
                  <span>
                    <button className="btn mr-2" onClick={() => toggleEditable(false)}>
                      Cancel changes
                    </button>
                    <button className="btn btn-primary mr-2" onClick={onUpdateClick}>
                      Update
                    </button>
                  </span>
                ) : (
                  <button className="btn mr-2" onClick={onEditClick}>
                    Edit
                  </button>
                )}
                <button className="btn btn-error" onClick={onRemoveClick}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const DateRangeField = ({ editable, label, date }) => {
  return (
    <div className="tile tile-centered mt-2">
      <div className="tile-content">
        <div className="tile-title text-bold">{label}</div>
        <div className="tile-subtitle">
          <DateRangePicker
            disabled={!editable}
            from={moment(date.from, 'DD-MM-YYYY')}
            to={moment(date.to, 'DD-MM-YYYY')}
          />
        </div>
      </div>
    </div>
  );
};

const AmountField = ({ editable, label, amount }) => {
  amount = currencyIntl.format(amount);
  return (
    <div className="tile tile-centered mt-2">
      <div className="tile-content">
        <div className="tile-title text-bold">{label}</div>
        <div className="tile-subtitle mb-2">
          {editable ? (
            <input className="form-input" type="text" placeholder={amount} />
          ) : (
            <span>{amount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { budgets: state.budgets };
};

export default connect(mapStateToProps)(BudgetsView);
