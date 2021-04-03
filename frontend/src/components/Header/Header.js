import style from './Header.module.css';
import { Link } from 'react-router-dom'
import { useHistory,  } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from '../../contexts/UserContext';

export default function Header({ loggedIn, username }) {
    const history = useHistory();
    const context = useContext(UserContext)

    function handleLogout () {
        history.push('/auth/login');
        console.log(history);
    }

    if (context.isAuthenticated) {
        return (
            <div className={style.nav}>
                <ul>
                    <Link to="/home">
                        <li><a href="/" className={style.navLink}>Home</a></li>
                    </Link>
                    <Link to="/vacationDays">
                        <li><a href="/" className={style.navLink}>Vacation Days</a></li>
                    </Link>
                    <Link to="/sickDays">
                        <li><a href="/" className={style.navLink}>Sick Days</a></li>
                    </Link>
                    <Link to="/about">
                        <li><a href="/about" className={style.navLink}>About</a></li>
                    </Link>
                    <Link to="/user/profile/someUser">
                        <li className={style.navSide}><a href="/" className={style.navLink}>{"Hello, " + context.username}</a></li>
                    </Link>
                    <Link to="/logout" onClick={handleLogout}>
                        <li><a href="/" className={style.navLink}>Logout</a></li>
                    </Link>

                </ul>
            </div>
        )
    }
    return (
        <div className={style.nav}>

            <ul>
                <Link to="/home">
                    <li><a href="/" className={style.navLink}>Home</a></li>
                </Link>
                <Link to="/register">
                    <li><a href="/" className={style.navLink}>Sign up</a></li>
                </Link>
                <Link to="/login">
                    <li><a href="/" className={style.navLink}>Sign in</a></li>
                </Link>
                <Link to="/about">
                    <li><a href="/about" className={style.navLink}><em>About</em></a></li>
                </Link>

            </ul>
        </div>
    )
}

