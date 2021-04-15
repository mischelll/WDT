import { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import style from './ProfileComponent.module.css'

export default function ProfileComponent() {
    const { currentUser, isAdmin, isAuthenticated } = useContext(UserContext);
    const [email, setEmail] = useState();



    function handleEmailChange(e) {
        e.preventDefault()
        console.log(isAdmin);
        setEmail(e.target.value)
    }

    if (!isAuthenticated) {
        console.log(currentUser);
        return <Redirect to={"/home"}/>
    }


    return (

        <div className={style.card}>
            {isAdmin &&
                <div>
                    <a href="/admin/vacationDays">Sick Days panel</a>
                    <br></br>
                    <a href="/">Vacation Days panel</a>
                </div>
            }

            <form>
                <label className={style.label}>Username: </label>
                <input className={style.inputField} placeholder={currentUser.username} />
                <label className={style.label}>Email: </label>
                <input className={style.inputField} placeholder={currentUser.email} onChange={handleEmailChange} />
                <label className={style.label}>Sick Days available: </label>
                <h4>{currentUser.annualSickDaysAllowed}</h4>
                <label className={style.label}>Vacation Days available: </label>
                <h4>{currentUser.annualVacationDaysAllowed}</h4>
                <button>Save</button>
            </form>
        </div>
    )


}