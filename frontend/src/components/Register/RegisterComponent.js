import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form"
import style from './RegisterComponent.module.css';
import { useHistory, } from 'react-router-dom';
import { signup } from '../../service/authService';

export default function RegisterComponent() {

    const { register, handleSubmit, errors, watch } = useForm();
    const [errorMessages, setErrorMessages] = useState([{}]);
    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();

    const onSubmit = (data) => {
        console.log(data);
        signup(data)
            .then(res => {

                console.log(res.hasOwnProperty('successfullMessage'));
                if (res.hasOwnProperty('successfullMessage')) {
                    history.push('/login')
                } else {
                    setErrorMessages(res)
                }

            })

    }

    return (
        <div className={style.component}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessages && errorMessages.map(x => {
                    return (
                        <>
                            {x.errorMessage && <><p className={style.error}>{x.errorMessage}</p><br /> </>}
                        </>

                    )
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
                    <input
                        type="email"
                        placeholder="example@example.com"
                        id="email"
                        name="email"
                        ref={register({
                            required: "Email is required",
                        })} />
                    {errors.email && <p className={style.error}>{errors.email.message}</p>}
                </div>
                <div className={style.inputField}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        id="password"
                        name="password"
                        ref={register({
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })} />
                    {errors.password && <p className={style.error}>{errors.password.message}</p>}
                </div>
                <div className={style.inputField}>
                    <label htmlFor="repeatPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        id="repeatPassword"
                        name="repeatPassword" ref={register({
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })} />
                    {errors.repeatPassword && <p className={style.error}>{errors.repeatPassword.message}</p>}
                </div>
                <div className={style.inputField}>
                    <label htmlFor="annualVacationDaysAllowed">Annual Vacation Days Allowed</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0"
                        id="annualVacationDaysAllowed"
                        name="annualVacationDaysAllowed" ref={register({
                            required: "You must enter annual vacation days allowed",
                            min: {
                                value: 1,
                                message: "Annual vacation days allowed must be at least 1"
                            }
                        })} />
                    {errors.annualVacationDaysAllowed && <p className={style.error}>{errors.annualVacationDaysAllowed.message}</p>}
                </div>
                <div className={style.inputField}>
                    <label htmlFor="annualSickDaysAllowed">Annual Sick Days Allowed</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0"
                        id="annualSickDaysAllowed"
                        name="annualSickDaysAllowed"
                        ref={register({
                            required: "You must enter annual sick days allowed",
                            min: {
                                value: 1,
                                message: "Annual sick days allowed must be at least 1"
                            }
                        })} />
                    {errors.annualSickDaysAllowed && <p className={style.error}>{errors.annualSickDaysAllowed.message}</p>}
                </div>

                <div className={style.inputField}>
                    <label htmlFor="annualSickDaysAllowed">Payment per Day</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="0$"
                        id="paymentPerDday"
                        name="paymentPerDday"
                        ref={register({
                            required: "You must enter a payment per day",
                            min: {
                                value: 31,
                                message: "Payment per day cannot be less than 31 leva"
                            }
                        })} />
                    {errors.paymentPerDday && <p className={style.error}>{errors.paymentPerDday.message}</p>}
                </div>
                <div className={style.action}>
                    <a href="/login">Already a member? <span>Sign in</span></a>
                    <button id="btn" className={style.btn}>Sign up</button>
                </div>
            </form>
        </div>
    );
};