import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import style from './RegisterComponent.module.css';
import { register } from '../../service/authService';

export default function RegisterComponent() {

    const [userData, setUserData] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);

        setUserData(register(data));
    }

    return (
        <div className={style.component}>
            <form onSubmit={handleSubmit(onSubmit)}>
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