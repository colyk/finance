import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/login.css';
import requests from '../requests';

class SingUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    if (sessionStorage.logged) this.props.history.push('home');
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

    requests
      .post('signup', { user })
      .then(res => {
        if ('error' in res.data) {
          this.setState({
            error: res.data.error,
          });
        } else {
          sessionStorage.logged = true;
          this.props.history.push('home');
        }
      })
      .catch(console.error);
  };

  render() {
    return (
      <div className="login-page">
        <div className="form">
          {this.state.error && <div className="toast toast-error mb-2">{this.state.error}</div>}
          <form className="register-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="input-name">
                Name
              </label>
              <input
                className="form-input"
                id="input-name"
                type="text"
                name="username"
                placeholder="name"
                onChange={this.handleChange}
              />
              <label className="form-label" htmlFor="input-password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                id="input-password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              sign up
            </button>
            <p className="link text-gray text-center">
              Already registered?
              <Link className="btn btn-sm btn-link" to="/login">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SingUp);
