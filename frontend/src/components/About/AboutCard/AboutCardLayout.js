import { AboutCardContent } from './AboutCardContent'
import style from './AboutCardLayout.module.css'
import aboutContentUtil from '../../../util/aboutContent/aboutContent'

export const AboutCardLayout = () => {
    return (
        <div className={style.row}>
            <div className={style.column}>
                <AboutCardContent title={aboutContentUtil.TRACK_WORKING_DAYS_TITLE} description={aboutContentUtil.TRACK_VACATION_DAYS_DESC} />
            </div>
            <div className={style.column}>
                <AboutCardContent title={aboutContentUtil.TRACK_SICK_DAYS_TITLE} description={aboutContentUtil.TRACK_SICK_DAYS_DESC} />
            </div>
            <div className={style.column}>
                <AboutCardContent title={aboutContentUtil.REQUEST_SICK_VACATION_DAYS_TITLE} description={aboutContentUtil.REQUEST_SICK_VACATION_DAYS_DESC} />
            </div>
            <div className={style.column}>
            <AboutCardContent title={aboutContentUtil.REQUEST_SICK_VACATION_DAYS_TITLE} description={aboutContentUtil.REQUEST_SICK_VACATION_DAYS_DESC} />
            </div>
        </div>
    )
}