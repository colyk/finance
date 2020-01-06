import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';

class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post('http://localhost:8000/signup', { user })
      .then(res => {
        console.log(res.data);
        this.props.history.push('home');
      })
      .catch(console.error);
  };

  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form" method="post" onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="name" onChange={this.handleChange} />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button type="submit">sign up</button>
            <p className="message">
              Already registered? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SingUp);
