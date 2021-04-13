
import { FaInfo, FaSlash, FaRegThumbsUp } from 'react-icons/fa';
import style from './Popup.module.css'

export function Popup(props) {

    return (

        <div className={style.tooltip}>
            {props.info === 'info' ?
                <div>
                    <FaInfo />
                    <span className={style.tooltiptext}>Only 'pending' vacation periods can be edited or deleted.</span>
                </div>
                :
                props.info === 'tick' ?
                <div>
                <FaRegThumbsUp />
                    <span className={style.tooltiptext}>Your requested vacation period has been approved.</span>
                </div>
                :
                <FaSlash />
            }

        </div>

    )
}