import React from 'react';
import '../styles/login.css';
import axios from 'axios';

export default class SingUp extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:8000/signup', { user })
        .then(res => {
            console.log(res.data);
        })
        .catch(console.error);
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form" method="post" onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="name" onChange={this.handleChange}/>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                        <button type="submit">create</button>
                        <p className="message">Already registered? <a href="/login">Sign In</a></p>
                    </form>
                </div>
            </div>

        );
    }
}
