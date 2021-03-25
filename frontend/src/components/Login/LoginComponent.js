import style from './LoginComponent.module.css'
import { Component } from 'react';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className={style.component}>
        <div className={style.form}>
          <div className={style.inputField}>
            <label for="email">Email</label>
            <input type="email" placeholder="example@example.com" id="email" name="email" />
          </div>
          <div className={style.inputField}>
            <label for="password">Password</label>
            <input type="password" placeholder="********" id="password" name="password" />
          </div>
          <div className={style.action}>
            <a href="/">forgot your password?</a>
            <button id="btn" className={style.btn}>Sign in</button>
          </div>
        </div>
      </div>
    )
  }
}