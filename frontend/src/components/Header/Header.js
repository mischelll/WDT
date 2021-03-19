import style from './Header.module.css';

export default function Header() {
    return (
        <div className={style.nav}>
            <ul>
                <li><a href="/" className={style.navLink}>Home</a></li>
                <li><a href="/" className={style.navLink}><em>Act Now!</em></a></li>
                <li><a href="/" className={style.navLink}>FAQ</a></li>
                <li><a href="/" className={style.navLink}>Contact Us</a></li>
            </ul>
        </div>
    )
}

