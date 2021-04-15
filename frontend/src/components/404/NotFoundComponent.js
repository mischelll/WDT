import { FaSadTear, FaRegSadCry } from 'react-icons/fa';
import style from './NotFoundComponent.module.css'

export default function NotFoundComponent() {

    return (
        <div>
            <div>
                <img src="wdtlogo.png" width="250" height="250" alt="logo" />
            </div>
            <div className={style.notFoundContainer}>
                <FaSadTear />
                <FaSadTear />
                <FaSadTear />
                <h1>404 NOT FOUND</h1>
                <FaRegSadCry />
                <FaRegSadCry />
                <FaRegSadCry />
            </div>

        </div>
    )
}