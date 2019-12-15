import React from 'react';
import '../styles/login.css';

export default class SingUp extends React.Component {
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="name" />
                        <input type="password" placeholder="password" />
                        <input type="text" placeholder="email address" />
                        <button>create</button>
                        <p className="message">Already registered? <a href="/login">Sign In</a></p>
                    </form>
                </div>
            </div>

        );
    }
}