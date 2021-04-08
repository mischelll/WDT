import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import style from './RegisterComponent.module.css';
import { useHistory, } from 'react-router-dom';
import { signup } from '../../service/authService';

export default function RegisterComponent() {

    const { register, handleSubmit, errors } = useForm();
    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();

    const onSubmit =  (data) => {
        console.log(data);
let arr = []

        signup(data)
        .catch(err => {
            setErrorMessages(err)
            history.push('/register')
            console.log(errorMessages);
            return;
        })
        history.push('/login')
    }

    return (
        <div className={style.component}>
            <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessages && errorMessages.map(x => {
                return <p className={style.error}>{x.errorMessage}</p>
            })}
                <div className={style.inputField}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Your username..."
                        id="username"
                        name="username"
                        ref={register({
                            required: "Username is required",
                            minLength: { value: 8, message: "Username must be at least 8 characters" }
                        })} />
                    {errors.username && <p className={style.error}>{errors.username.message}</p>}

                </div>
                <div className={style.inputField}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="example@example.com" id="email" name="email" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="********" id="password" name="password" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label htmlFor="repeatPassword">Confirm Password</label>
                    <input type="password" placeholder="********" id="repeatPassword" name="repeatPassword" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label htmlFor="annualVacationDaysAllowed">Annual Vacation Days Allowed</label>
                    <input type="number" min="0" placeholder="0" id="annualVacationDaysAllowed" name="annualVacationDaysAllowed" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label htmlFor="annualSickDaysAllowed">Annual Sick Days Allowed</label>
                    <input type="number" min="0" placeholder="0" id="annualSickDaysAllowed" name="annualSickDaysAllowed" ref={register} />
                </div>
                <div className={style.action}>
                    <a href="/login">Already a member? <span>Sign in</span></a>
                    <button id="btn" className={style.btn}>Sign up</button>
                </div>
            </form>
        </div>
    );
};