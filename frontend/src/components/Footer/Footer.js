import style from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={style.siteFooter}>
            <div className={style.container}>
                <div className={style.row}>
                    <div>
                        <h6>WDT - Wokrday Tracker App</h6>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}