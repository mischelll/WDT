import ReactModal from 'react-modal';
import style from '../VacationDay/VacationDay.module.css'
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Popup } from '../Popup/Popup';
import DatePicker from "react-date-picker";

export default function VacationDaysRow({ vacationDay }) {
    const [isEditFormVisible, setEditForm] = useState(false);
    const [isDeleteFormVisible, setDeleteForm] = useState(false);
    const [startEditDate, setstartEditDate] = useState(new Date());
    const [endEditDate, setendEditDate] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();
    const [isManageFormVisible, setManageForm] = useState(false);
    const [error, setError] = useState("");

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

    function handleDelete(vacaDayId) {
        fetch('http://localhost:8082/api/vacationDay/' + vacaDayId, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        })
            .then(data => data.json())
            .then(day => {
                console.log(day);
            })
            .catch(e => e.message);
    }

    function addDays(date, daysToAdd) {
        return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() + daysToAdd)
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

    function handleApproval(vacaDayId) {
        console.log(vacaDayId);
        fetch('http://localhost:8082/api/admin/vacationDay/' + vacaDayId, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "status": 'approved'
                }
            )

        })
            .then(data => data.json())
            .then(day => {
                if (Object.hasOwnProperty('error')) {
                    setError(day.error);
                    console.log(error);
                    console.log(day);
                } else {
                    closeManageModal();
                }
            })
            .catch(e => e.message);
    }

    function handleDecline(vacaDayId) {
        console.log(vacaDayId);
        fetch('http://localhost:8082/api/admin/vacationDay/' + vacaDayId, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "status": 'declined'
                }
            )

        })
            .then(data => data.json())
            .then(day => {
                if (Object.hasOwnProperty('error')) {
                    setError(day.error);
                    console.log(error);
                    console.log(day);
                } else {
                    closeManageModal();
                }
            })
            .catch(e => e.message);
    }

    function closeManageModal(){
        setManageForm(false);
        setError("")
    }

    return (
        <tr key={vacationDay._id}>
            <td>{vacationDay.from.substring(0, 10)}</td>
            <td>{vacationDay.to.substring(0, 10)}</td>
            <td>{vacationDay.missedWorkingDays}</td>
            <td>{vacationDay.username}</td>
            <td>{vacationDay.status}</td>

            {function f() {
                return vacationDay.status === 'pending' ?
                    <td><button onClick={() => setEditForm(true)} className={style.editDayButton}><span>Edit</span></button></td> :
                    vacationDay.status === 'approved' ?
                        <td><Popup info="tick" /></td>
                        :
                        <td><Popup info="info" /></td>
            }()}

            {function f() {
                return vacationDay.status === 'pending' ?
                    <td><button onClick={() => setDeleteForm(true)} className={style.deleteDayButton}><span>Delete</span></button></td>

                    :
                    <td>-</td>
            }()}

            {(() => {
                return vacationDay.status === 'pending' ?
                    <td><button onClick={() => setManageForm(true)} className={style.manageButton}><span>Manage</span></button></td>
                    :
                    <td>-</td>
            })()}

            <ReactModal
                isOpen={isDeleteFormVisible}
                onRequestClose={() => setDeleteForm(false)}
                contentLabel="Example Modal"
                style={customStylesDelete}
                ariaHideApp={false}
            >
                <h1>Sure you want to delete this?</h1>
                <button onClick={() => handleDelete(vacationDay._id)} >Yes</button>
                <button onClick={() => setDeleteForm(false)}>No</button>
            </ReactModal>

            <ReactModal
                isOpen={isEditFormVisible}
                onRequestClose={() => setEditForm(false)}
                contentLabel="Example Modal"
                style={customStyles}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onEdit)}>
                    <h2>Edit working day</h2>
                    <input type="hidden" id="vacaDayId" name="vacaDayId" value={vacationDay._id} ref={register()} />
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
                isOpen={isManageFormVisible}
                onRequestClose={() => setManageForm(false)}
                contentLabel="Example Modal"
                style={customStylesDelete}
                ariaHideApp={false}
            >
                <h1>Vacation for the period from {vacationDay.from.substring(0, 10)} to {vacationDay.to.substring(0, 10)} requested by {(vacationDay.username)}: </h1>
                <p>{vacationDay.reason}</p><br />
                <button onClick={() => handleApproval(vacationDay._id)} >Approve</button>
                <button onClick={() => handleDecline(vacationDay._id)} >Decline</button><br /><br />
                <button onClick={() => setManageForm(false)}>Close</button>
            </ReactModal>


        </tr>
    )
}