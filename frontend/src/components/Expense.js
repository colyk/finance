import React from 'react';
import requests from '../requests';

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',
            category: '',
            year: '',
            month: '',
            day: '',
            monthDay: ''
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

        const expense = {
            count: this.state.count,
            category: 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            monthDay: 0
        };
        requests
            .post('expenses', { expense })
            .then(console.log)
            .catch(console.error);
    };

    render() {
        return (
            <div className="form_expense">
                <form className="form" onSubmit={this.handleSubmit}>
                    <p>Expense</p>
                    <input type="text" name="count" placeholder="count" onChange={this.handleChange} />
                    <button type="submit">Add expense</button>
                </form>
            </div>
        );
    }
}

export default Expense;
