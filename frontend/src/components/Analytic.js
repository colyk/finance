import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { currencyIntl, nowMoment } from './utils';
import { fetchAnalytics } from './store/actions/actionAnalytic';
import ExpensesBarChart from './Trends/ExpensesBarChart';

import '../styles/analytic.css';

function Analytic({ fetchAnalytics, monthlyExpenses, monthlyIncomes, transactionsCurrentMonth }) {
  const [month] = useState(nowMoment._d.getMonth() + 1);

  useEffect(() => {
    fetchAnalytics(month);
  }, [fetchAnalytics, month]);

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
        <div className="column col-xs-12 expenses-trend">
          <h5>Monthly expense</h5>
          <ExpensesBarChart transactions={transactionsCurrentMonth} />
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
    fetchAnalytics: month => dispatch(fetchAnalytics(month)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytic);
