import React from 'react';
import '../styles/login.css';

export default class SingIn extends React.Component {
    render() {
        return (
            <div class="login-page">
                <div class="form">
                    <form class="login-form">
                        <input type="text" placeholder="username" />
                        <input type="password" placeholder="password" />
                        <button>login</button>
                        <p class="message">Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </div>

        );
    }
}