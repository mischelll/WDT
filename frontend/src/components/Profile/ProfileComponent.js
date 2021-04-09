import { useContext, useState } from 'react';
import {UserContext} from '../../contexts/UserContext';
import style from './ProfileComponent.module.css'

export default function ProfileComponent() {
    const { currentUser } = useContext(UserContext);
    const [email, setEmail] = useState();

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    return (
        <div className={style.card}>
            <form>
                <label className={style.label}>Username: </label>
                <input className={style.inputField} placeholder="John Doe" />
                <label className={style.label}>Email: </label>
                <input className={style.inputField} placeholder="johdoe@mail.com"  onChange={handleEmailChange} />
                <label className={style.label}>Sick Days available: </label>
                <h4>{currentUser.annualSickDaysAllowed}</h4>
                <label className={style.label}>Vacation Days available: </label>
                <h4>{currentUser.annualVacationDaysAllowed}</h4>

                <button>Save</button>
            </form>
        </div>
    )


}