import React, { Component } from 'react';
import requests from '../requests';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budgets: [],
    };

    this.fetchBudgets();
  }

  fetchBudgets() {
    requests
      .get('/budget')
      .then(console.log)
      .catch(console.log);
  }

  render() {
    return <div>{this.budgets}</div>;
  }
}

export default Calendar;
