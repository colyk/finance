import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';
class SingIn extends React.Component {
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
      .post('http://localhost:8000/login', { user })
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
          <form className="login-form" method="post" onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="name" onChange={this.handleChange} />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button type="submit">sign in</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SingIn);
