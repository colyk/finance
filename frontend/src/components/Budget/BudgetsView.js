import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchBudgets } from '../store/actions/index';
import { putBudget, updateBudget, resetUpdatedBudget } from '../store/actions/componentBudget';

import moment from 'moment';

import requests from '../../requests';
import { currencyIntl } from '../utils';

import DateRangePicker from '../DatePickers/DateRangePicker';

const BudgetsView = ({ budgets, putBudget, fetchBudgets, updateBudget, resetUpdatedBudget }) => {
  const [editable, toggleEditable] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const { budgetName } = useParams();
  const [budget, setBudget] = useState(() => ({}));
  const initBudget = budgets ? budgets.find(b => b.name === budgetName) : {};

  useEffect(() => setBudget(initBudget || {}), [initBudget]); // trigger changing state after `[initBudget]` changes

  const formatDate = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  const onRemoveClick = () => {
    toggleLoading(true);
    requests
      .delete('/budget', { params: { name: budgetName } })
      .then(res => {
        fetchBudgets();
      })
      .catch(console.log)
      .finally(() => toggleLoading(false));
  };

  const onEditClick = () => {
    toggleEditable(true);
  };

  const onCancelClick = () => {
    resetUpdatedBudget();
    toggleEditable(false);
  };

  const onUpdateClick = () => {
    toggleLoading(true);

    putBudget(budget.name)
      .then(res => {
        fetchBudgets();
      })
      .catch(console.log)
      .finally(() => toggleLoading(false));
    toggleEditable(false);
    resetUpdatedBudget();
  };

  return (
    <div>
      {budget.name ? (
        <div className="columns">
          <div className={`column col-6 col-mx-auto panel ${loading ? 'loading' : ''}`}>
            <TitleField
              editable={editable}
              title={budget.name}
              label={'Budget name'}
              updateBudget={updateBudget}
            />
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
                    <button className="btn mr-2" onClick={onCancelClick}>
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

const TitleField = ({ editable, title, label, updateBudget }) => {
  let Component = () => (
    <input
      className="form-input"
      type="text"
      placeholder={title}
      onChange={e => {
        updateBudget({ name: e.target.value });
      }}
    />
  );

  const titleClass = 'panel-header text-center';
  const bodyClass = 'panel-body mt-2';
  return (
    <div className={editable ? bodyClass : titleClass}>
      {editable ? (
        <Field Component={Component} label={label} />
      ) : (
        <div className="panel-title h3">{title}</div>
      )}
    </div>
  );
};

const DateRangeField = ({ editable, label, date, updateBudget }) => {
  const Component = () => (
    <DateRangePicker
      disabled={!editable}
      from={moment(date.from, 'DD-MM-YYYY')}
      to={moment(date.to, 'DD-MM-YYYY')}
      onChange={data => updateBudget({ from: data.startDate, to: data.endDate })}
    />
  );

  return <Field Component={Component} label={label} />;
};

const AmountField = ({ editable, label, amount, updateBudget }) => {
  amount = currencyIntl.format(amount);

  let Component = null;
  if (editable)
    Component = () => (
      <input
        className="form-input"
        type="text"
        placeholder={amount}
        onChange={e => {
          updateBudget({ amount: e.target.value });
        }}
      />
    );
  else Component = () => <span>{amount}</span>;

  return <Field Component={Component} label={label} />;
};

const Field = React.memo(({ Component, label }) => {
  return (
    <div className="tile tile-centered mt-2">
      <div className="tile-content">
        <div className="tile-title text-bold mb-1">{label}</div>
        <div className="tile-subtitle mb-2">
          <Component />
        </div>
      </div>
    </div>
  );
});

const mapStateToProps = state => {
  return {
    budgets: state.rootReducer.budgets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBudgets: () => dispatch(fetchBudgets()),
    updateBudget: payload => dispatch(updateBudget(payload)),
    resetUpdatedBudget: payload => dispatch(resetUpdatedBudget(payload)),
    putBudget: payload => dispatch(putBudget(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetsView);
