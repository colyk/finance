import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/login.css';
import requests from '../requests';
class SingIn extends React.Component {
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
      .post('login', { user })
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
          <form className="login-form" onSubmit={this.handleSubmit}>
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
              sign in
            </button>
            <p className="link text-gray text-center">
              Not registered?
              <Link className="btn btn-sm btn-link" to="/signup">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SingIn);
