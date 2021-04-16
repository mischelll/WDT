import { FaInfo, FaSlash, FaRegThumbsUp, FaCross } from 'react-icons/fa';
import style from './Popup.module.css'

export function Popup(props) {

    return (

        <div className={style.tooltip}>
            {props.info === 'info' ?
                <div>
                    <FaCross />
                    <span className={style.tooltiptext}>The requested vacation period has been 'declined' by an administrator.</span>
                </div>
                :
                props.info === 'tick' ?
                <div>
                <FaRegThumbsUp />
                    <span className={style.tooltiptext}>The requested vacation period has been 'approved' by an administrator.</span>
                </div>
                :
                <FaSlash />
            }

        </div>

    )
}