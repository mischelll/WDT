import style from '../VacationDay/VacationDay.module.css'
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getAllVacationDays } from '../../service/vacationDayService';
import DatePicker from "react-date-picker";
import { Popup } from '../Popup/Popup';

export default function VacationDay() {
    const { currentUser } = useContext(UserContext);
    const [vacationDays, setVacationDays] = useState([]);
    const [isEditFormVisible, setEditForm] = useState(false);
    const [isDeleteFormVisible, setDeleteForm] = useState(false);
    const [isRequestDayFormVisible, setRequestDayForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startEditDate, setstartEditDate] = useState(new Date());
    const [endEditDate, setendEditDate] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        if (currentUser._id) {
            getAllVacationDays()
                .then(data => {
                    setVacationDays(data);
                })
        }
    }, [setVacationDays, currentUser._id]);



    function onEdit(data) {
        console.log(data);

        startEditDate.setDate(startEditDate.getDate() + 1)
        endEditDate.setDate(endEditDate.getDate() + 1)
        fetch('http://localhost:8082/api/vacationDay', {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "_id": data.vacaDayId,
                    "from": startEditDate?.toISOString().slice(0, 10),
                    "to": endEditDate?.toISOString().slice(0, 10)
                }
            )
        })
            .then(data => data.json())
            .then(day => {
                console.log(day);
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
            backgroundColor: "rgba(0, 0, 0, 0.2)",

        }
    };

    const customStylesDelete = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",

        }
    };

    function addDays(date, daysToAdd) {

        return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() + daysToAdd)
    }

    function handleDelete(e) {
        console.log(e);
    }

    return (
        <div>
            <div className={style.reqButtonContainer}>
                <ReactModal
                    isOpen={isEditFormVisible}
                    onRequestClose={() => setEditForm(false)}
                    contentLabel="Example Modal"
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <form onSubmit={handleSubmit(onEdit)}>
                        <h2>Edit working day</h2>
                        <input type="hidden" id="vacaDayId" name="vacaDayId" ref={register()} />
                        <label>Start time</label>
                        <DatePicker
                            className={style.editForm}
                            selected={startEditDate}
                            onChange={date => setstartEditDate(date)}
                            minDate={addDays(new Date(), 0)}

                        />
                        <label>End time</label>
                        <DatePicker
                            className={style.editForm}
                            selected={endEditDate}
                            onChange={date => setendEditDate(date)}
                            minDate={addDays(startEditDate, 1)}
                        />
                        {startEditDate < endEditDate ? <button>Edit</button> : <button disabled>Edit</button>}
                    </form>
                </ReactModal>


                <ReactModal
                    isOpen={isDeleteFormVisible}
                    onRequestClose={() => setDeleteForm(false)}
                    contentLabel="Example Modal"
                    style={customStylesDelete}
                    ariaHideApp={false}
                >
                    <h1>Sure you want to delete this? </h1>
                    <button onClick={handleDelete} >Yes</button>
                    <button onClick={() => setDeleteForm(false)}>No</button>
                </ReactModal>
            </div>
            <table className={style.table}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Missed working days</th>
                        <th>User</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mapVacationDays()}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>16 missed Wds</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

    function mapVacationDays() {
        if (vacationDays.length > 0) {
            return vacationDays.map(x =>
                <tr key={x._id}>
                    <td>{x.from.substring(0, 10)}</td>
                    <td>{x.to.substring(0, 10)}</td>
                    <td>4</td>
                    <td>{x.username}</td>
                    <td>{x.status}</td>

                    {function f() {
                        return x.status === 'pending' ?
                            <td><button onClick={() => setEditForm(true)} className={style.editDayButton}><span>Edit</span></button></td> :
                            x.status === 'approved' ?
                                <td><Popup info="tick" /></td>
                                :
                                <td><Popup info="info" /></td>
                    }()}

                    {function f() {
                        return x.status === 'pending' ?
                            <td><button onClick={() => setDeleteForm(true)} className={style.deleteDayButton}><span>Delete</span></button></td>
                            :
                            <td>-</td>
                    }()}


                </tr>
            );
        } else {
            return <h2>No vacation days</h2>
        }
    }
}