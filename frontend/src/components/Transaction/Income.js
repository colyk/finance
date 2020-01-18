import React from 'react';
import requests from '../../requests';

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      year: '',
      month: '',
      day: '',
    };
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const income = {
      count: this.state.count,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
    requests
      .post('incomes', { income })
      .then(console.log)
      .catch(console.error);
  };

  render() {
    return (
      <div className="form_income">
        <form className="form" onSubmit={this.handleSubmit}>
          <p>Income</p>
          <input type="text" name="count" placeholder="count" onChange={this.handleChange} />
          <button type="submit">Add income</button>
        </form>
      </div>
    );
  }
}

export default Income;
