import { Component } from 'react';
import style from './RegisterComponent.module.css';

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={style.component}>
                <div className={style.form}>
                    <div className={style.inputField}>
                        <label for="username">Username</label>
                        <input type="text" placeholder="Your username..." id="username" name="username" />
                    </div>
                    <div className={style.inputField}>
                        <label for="email">Email</label>
                        <input type="email" placeholder="example@example.com" id="email" name="email" />
                    </div>
                    <div className={style.inputField}>
                        <label for="password">Password</label>
                        <input type="password" placeholder="********" id="password" name="password" />
                    </div>
                    <div className={style.inputField}>
                        <label for="repeatPassword">Confirm Password</label>
                        <input type="password" placeholder="********" id="repeatPassword" name="repeatPassword" />
                    </div>
                    <div className={style.inputField}>
                        <label for="password">Annual Vacation Days Allowed</label>
                        <input type="number" min="0" placeholder="0" id="annualVacationDays" name="annualVacationDays" />
                    </div>
                    <div className={style.inputField}>
                        <label for="password">Annual Sick Days Allowed</label>
                        <input type="number" min="0" placeholder="0" id="annualSickDays" name="annualSickDays" />
                    </div>
                    <div className={style.action}>
                        <a href="/">Already a member? <span>Sign in</span></a>
                        <button id="btn" className={style.btn}>Sign up</button>
                    </div>
                </div>
            </div>
        );
    };
};