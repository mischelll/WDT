import style from './Header.module.css';

export default function Header({loggedIn}) {
    return (
        <div className={style.nav}>
            <ul>
                <li><a href="/" className={style.navLink}>Home</a></li>
                <li><a href="/" className={style.navLink}>FAQ</a></li>
                <li><a href="/" className={style.navLink}>{loggedIn ? "Logout":"Sign in"}</a></li>
                <li><a href="/about" className={style.navLink}><em>About</em></a></li>
            </ul>
        </div>
    )
}

