import Calendar from 'react-calendar'
import style from './HomePage.module.css';

export function HomeAuthenticatedComponent({username}) {

    return (
        <div>

            <div className={style.welcomeContainer}>
                <h1>{`Welcome to WDT, ${username}!`}</h1>
            </div>

            <div className={style.calendarContainer}>

                <Calendar />

            </div>
        </div>
    )
}