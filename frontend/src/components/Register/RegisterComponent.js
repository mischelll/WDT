import React from 'react';
import { useForm } from "react-hook-form"
import style from './RegisterComponent.module.css';

export default function RegisterComponent() {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
       
        fetch('http://localhost:8080/api/auth/register', {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(dt => {
                console.log(data);
            })
            .catch(err => console.log(err.message));
    }

    return (
        <div className={style.component}>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputField}>
                    <label for="username">Username</label>
                    <input
                        type="text"
                        placeholder="Your username..."
                        id="username"
                        name="username"
                        ref={register({
                            required: "Username is required",
                            minLength: { value: 8, message: "Username must be at least 8 characters" }
                        })} />
                    {errors.username && <p>{errors.username.message}</p>}

                </div>
                <div className={style.inputField}>
                    <label for="email">Email</label>
                    <input type="email" placeholder="example@example.com" id="email" name="email" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label for="password">Password</label>
                    <input type="password" placeholder="********" id="password" name="password" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label for="repeatPassword">Confirm Password</label>
                    <input type="password" placeholder="********" id="repeatPassword" name="repeatPassword" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label for="annualVacationDaysAllowed">Annual Vacation Days Allowed</label>
                    <input type="number" min="0" placeholder="0" id="annualVacationDaysAllowed" name="annualVacationDaysAllowed" ref={register} />
                </div>
                <div className={style.inputField}>
                    <label for="annualSickDaysAllowed">Annual Sick Days Allowed</label>
                    <input type="number" min="0" placeholder="0" id="annualSickDaysAllowed" name="annualSickDaysAllowed" ref={register} />
                </div>
                <div className={style.action}>
                    <a href="/">Already a member? <span>Sign in</span></a>
                    <button id="btn" className={style.btn}>Sign up</button>
                </div>
            </form>
        </div>
    );
};