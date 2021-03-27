import style from './LoginComponent.module.css'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login, getAdmin } from '../../service/authService';

export default function LoginComponent() {

  const { register, handleSubmit, errors } = useForm();
  const [userData, setUserData] = useState([]);

  const onSubmit = data => {
    login(data);
    console.log(getAdmin());

  }

  return (
    <div className={style.component}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputField}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Your username..."
            id="username"
            name="username"
            ref={register({
              required: "Username is required"
            })} />
          {errors.username && <p className={style.error}>{errors.username.message}</p>}
        </div>
        <div className={style.inputField}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            id="password"
            name="password"
            ref={register({
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 symbols." }
            })}
          />
          {errors.password && <p className={style.error}>{errors.password.message}</p>}
        </div>
        <div className={style.action}>
          <a href="/">forgot your password?</a>
          <button id="btn" className={style.btn}>Sign in</button>
        </div>
      </form>
    </div>
  );
};