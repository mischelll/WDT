import { AboutCardContent } from './AboutCardContent'
import style from './AboutCardLayout.module.css'

export const AboutCardLayout = () => {
    return (
        <div className={style.row}>
            <div className={style.column}>
                <AboutCardContent />
            </div>
            <div className={style.column}>
                <AboutCardContent />
            </div>
            <div className={style.column}>
                <AboutCardContent />
            </div>
            <div className={style.column}>
                <AboutCardContent />
            </div>
        </div>
    )
}