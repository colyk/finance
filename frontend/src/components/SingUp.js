import React from 'react';
import '../styles/login.css';

export default class SingUp extends React.Component {
    render() {
        return (
            <div class="login-page">
                <div class="form">
                    <form class="register-form">
                        <input type="text" placeholder="name" />
                        <input type="password" placeholder="password" />
                        <input type="text" placeholder="email address" />
                        <button>create</button>
                        <p class="message">Already registered? <a href="#">Sign In</a></p>
                    </form>
                </div>
            </div>

        );
    }
}