import React from 'react';
import '../styles/login.css';
import axios from 'axios';

export default class SingIn extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'username' ? target.value : target.value;
        const name = target.name;

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

        axios.post('http://localhost:8000/login', { user })
        .then(res => {
            console.log(res.data);
            console.log(res.data.data);
        })
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form" method="post" onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
                        <input type="password" name="password" placeholder="password" onChange={this.handleChange}/>
                        <button type="submit">login</button>
                        <p className="message">Not registered? <a href="/registration">Create an account</a></p>
                    </form>
                </div>
            </div>
        );
    }
}