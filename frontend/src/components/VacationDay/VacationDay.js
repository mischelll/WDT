import style from './VacationDay.module.css'
import HomeComponent from '../Home/HomeComponent'
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getVacationDaysByUser } from '../../service/vacationDayService';
import DatePicker from "react-date-picker";

export default function VacationDay() {
    const { currentUser } = useContext(UserContext);
    const [vacationDays, setVacationDays] = useState([]);
    const [isEditFormVisible, setEditForm] = useState(false);
    const [isRequestDayFormVisible, setRequestDayForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (currentUser._id) {
            getVacationDaysByUser(currentUser._id)
                .then(data => {
                    setVacationDays(data);
                })
        }

    }, [setVacationDays, currentUser._id]);


    function onSubmit(e) {
        console.log(startDate.toISOString());
        console.log(endDate.toISOString());
        console.log(startDate?.toISOString().slice(0, 10));
        console.log(endDate?.toISOString().slice(0, 10));

        fetch('http://localhost:8082/api/vacationDay', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(
                {
                    "from": startDate?.toISOString().slice(0, 10),
                    "to": endDate?.toISOString().slice(0, 10)
                }
            )
        })
            .then(data => {
                console.log(data);
            })
            .catch(e => e.message);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",

        }
    };

    function addDays(date, daysToAdd) {

        return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() + daysToAdd)
    }

    return (
        <div>
            <div className={style.reqButtonContainer}>
                <button onClick={() => setRequestDayForm(true)} className={style.requestVacaDaysButton}><span>+ Request new vacation period</span></button>
                <ReactModal
                    isOpen={isRequestDayFormVisible}
                    onRequestClose={() => setRequestDayForm(false)}
                    contentLabel="Example Modal"
                    style={customStyles}
                    ariaHideApp={false}
                >

                    <form className={style.editForm} onSubmit={handleSubmit(onSubmit)}>
                        <h2>Request vacation period</h2>
                        <label >Start time</label>
                        <DatePicker
                            className={style.editForm}
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={addDays(new Date(), 0)}

                        />

                        <label>End time</label>
                        <DatePicker
                            className={style.editForm}
                            selected={endDate + 1}
                            onChange={date => setEndDate(date)}
                            minDate={addDays(startDate, 0)}
                            isClearable={true}
                        />
                        <button>Request</button>
                    </form>
                </ReactModal>
            </div>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Missed working days</th>
                        <th>Revenue</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mapVacationDays()}
                    <ReactModal
                        isOpen={isEditFormVisible}
                        onRequestClose={() => setEditForm(false)}
                        contentLabel="Example Modal"
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <form className={style.editForm}>
                            <h2>Edit working day</h2>
                            <label >Start time</label>
                            <input name="start_time" type="text"></input>
                            <label >End time</label>
                            <input name="end_time" type="text"></input>
                        </form>
                    </ReactModal>

                </tbody>
                <tfoot>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )



    function mapVacationDays() {
        if (vacationDays.length > 0) {
            return vacationDays.map(x => <tr key={x._id}>
                <td>{x.from.substring(0, 10)}</td>
                <td>{x.to.substring(0, 10)}</td>
                <td>4</td>
                <td>395 $</td>
                <td>{x.status}</td>
                {function f() {
                    return x.status === 'pending' ?
                        <td><button onClick={() => setEditForm(true)} className={style.editDayButton}><span>Edit</span></button></td> :
                        <td>-</td>
                }()}

                {function f() {
                    return x.status === 'pending' ?
                        <td><button className={style.deleteDayButton}><span>Delete</span></button></td> :
                        <td>-</td>
                }()}

            </tr>
            );
        } else {
            return <h2>No vacation days</h2>
        }
    }
}