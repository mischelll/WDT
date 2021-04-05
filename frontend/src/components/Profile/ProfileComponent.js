import { Component } from 'react';
import style from './ProfileComponent.module.css'

export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={style.card}>
                <form>
                    <label className={style.label}>Username: </label>
                    <input className={style.inputField} placeholder="John Doe" />
                    <label className={style.label}>Email: </label>
                    <input className={style.inputField} placeholder="johdoe@mail.com" />
                    <label className={style.label}>Vacation Days available: </label>
                    <h4>14</h4>
                    <label className={style.label}>Sick Days available: </label>
                    <h4>4</h4>
            
                    <button>Save</button>
                </form>
            </div>
        )
    }

}