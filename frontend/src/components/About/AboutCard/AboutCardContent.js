import style from './AboutCardContent.module.css'

export const AboutCardContent = (props) => {
    return (
        <div className={style.card}>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    )
}