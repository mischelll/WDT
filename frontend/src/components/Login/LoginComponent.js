import style from './LoginComponent.module.css'
import React, { useState, useContext } from 'react';
import { useHistory, } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, getAdmin } from '../../service/authService';
import { UserContext } from '../../contexts/UserContext';

export default function LoginComponent() {

  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();

  const onSubmit = data => {
   Promise.resolve(context.login(data))
      .then(res => {
        history.push('/home')
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={style.component}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputField}>
          {error && <> <p className={style.error}>{error}</p></>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Your username..."
            id="username"
            name="username"
            ref={register({
              required: "Username is required",
              minLength: { value: 2, message: "Username must be at least 2 symbols." }
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