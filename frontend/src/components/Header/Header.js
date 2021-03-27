import style from './Header.module.css';
import { Link } from 'react-router-dom'

export default function Header({ loggedIn }) {
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
                    <li><a href="/" className={style.navLink}>{loggedIn ? "Logout" : "Sign in"}</a></li>
                </Link>
                <Link to="/about">
                    <li><a href="/about" className={style.navLink}><em>About</em></a></li>
                </Link>
            </ul>
        </div>
    )
}

