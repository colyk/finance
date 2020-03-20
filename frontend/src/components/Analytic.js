import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { currencyIntl, _moment } from './utils';
import { fetchAnalytics } from './store/actions/actionAnalytic';
import { fetchCategories } from './store/actions/index';
import ExpensesBarChart from './Trends/ExpensesBarChart';

import '../styles/analytic.css';

function Analytic({
  fetchAnalytics,
  fetchCategories,
  monthlyExpenses,
  monthlyIncomes,
  transactionsCurrentMonth,
}) {
  const [dateRange, setdateRange] = useState({
    from: _moment().startOf('month'),
    to: _moment().endOf('month'),
  });

  useEffect(() => {
    fetchCategories();
    fetchAnalytics(dateRange);
  }, [fetchCategories, fetchAnalytics, dateRange]);

  return (
    <div className="container grid-md">
      <div className="columns">
        <div className="column col-xs-12 main-anatylics">
          <div className="columns">
            <div className="column col-xs-4">
              <div>Monthly expense:</div>
              <div>{currencyIntl(monthlyExpenses)}</div>
            </div>
            <div className="column col-xs-4">
              <div>Monthly income:</div>
              <div>{currencyIntl(monthlyIncomes)}</div>
            </div>
            <div className="column col-xs-4">
              <div>Title:</div>
              <div>158,25 zł</div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column col-xs-12">
          <ExpensesBarChart
            transactions={transactionsCurrentMonth}
            setdateRange={setdateRange}
            chooseMonth={dateRange.from}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    monthlyExpenses: state.analyticReducer.monthlyExpenses,
    monthlyIncomes: state.analyticReducer.monthlyIncomes,
    transactionsCurrentMonth: state.analyticReducer.transactionsCurrentMonth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnalytics: dateRange => dispatch(fetchAnalytics(dateRange)),
    fetchCategories: () => dispatch(fetchCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytic);
