import React from 'react';
import requests from '../../requests';
import Income from './Income';
import Expense from './Expense';

class FinancialAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      expenses: [],
    };
    // this.getAllTransactions();
  }

  getAllTransactions() {
    requests
      .get('/transaction')
      .then(res => {
        this.setState({
          expenses: res.data.result,
        });
        console.log(res.data.result);
      })
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <h3>My financial analysis</h3>
        <div>
          <div>
            <h3>Incomes</h3>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.incomes.map(incomes => (
                  <tr key={incomes._id}>
                    <td>{incomes.count}</td>
                    <td>
                      {incomes.day}-{incomes.month}-{incomes.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Expenses</h3>
            <table>
              <thead>
                <tr>
                  <th>Count</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>MonthDay</th>
                </tr>
              </thead>
              <tbody>
                {this.state.expenses.map(expenses => (
                  <tr key={expenses._id}>
                    <td>{expenses.count}</td>
                    <td>{expenses.category}</td>
                    <td>
                      {expenses.day}-{expenses.month}-{expenses.year}
                    </td>
                    <td>{expenses.monthDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Income />
        <Expense />
      </div>
    );
  }
}

export default FinancialAnalysis;
