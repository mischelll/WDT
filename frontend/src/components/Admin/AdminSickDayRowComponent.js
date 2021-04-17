import style from './AdminSickDayComponent.module.css';
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Popup } from '../Popup/Popup';
import DatePicker from "react-date-picker";

export default function AdminSickDayRowComponent({ sickDay }) {

    const [revenue, setRevenue] = useState();
    const [isEditFormVisible, setEditForm] = useState(false);
    const [isDeleteFormVisible, setDeleteForm] = useState(false);
    const [isManageFormVisible, setManageForm] = useState(false);
    const [isReasonModalVisible, setReasonModal] = useState(false);
    const [startEditDate, setstartEditDate] = useState(new Date());
    const [endEditDate, setendEditDate] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState("");

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

    function onEdit(data) {
        console.log(data);

        startEditDate.setDate(startEditDate.getDate() + 1)
        endEditDate.setDate(endEditDate.getDate() + 1)
        fetch('http://localhost:8082/api/sickDay', {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "_id": data.sickDayId,
                    "from": startEditDate?.toISOString().slice(0, 10),
                    "to": endEditDate?.toISOString().slice(0, 10),
                    "reason": data.reason
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
                    setEditForm(false)
                }
            })
            .catch(e => e.message);
    }

    function handleDelete(sickDayId) {
        fetch('http://localhost:8082/api/sickDay/' + sickDayId, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        })
            .then(data => data.json())
            .then(day => {
                if (Object.hasOwnProperty('error')) {
                    setError(day.error);
                    console.log(error);
                    console.log(day);
                } else {
                    setDeleteForm(false)
                }
            })
            .catch(e => e.message);
    }

    function handleApproval(sickDayId) {
        console.log(sickDayId);
        fetch('http://localhost:8082/api/admin/sickDay/' + sickDayId, {
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

    function handleDecline(sickDayId) {
        console.log(sickDayId);
        fetch('http://localhost:8082/api/admin/vacationDay/' + sickDayId, {
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
        setError("");
    }

    return (
        <tr key={sickDay._id}>
            <td>{sickDay.from.substring(0, 10)}</td>
            <td>{sickDay.to.substring(0, 10)}</td>
            {
                <>
                    <td><button onClick={() => setReasonModal(true)} className={style.editDayButton}><span>See reason</span></button></td>

                </>
            }

            <td>{sickDay.status}</td>
            <td>{sickDay.username}</td>

            {(() => {
                return sickDay.status === 'pending' ?
                    <td><button onClick={() => setEditForm(true)} className={style.editDayButton}><span>Edit</span></button></td> :
                    sickDay.status === 'approved' ?
                        <td><Popup info="tick" /></td>
                        :
                        <td><Popup info="info" /></td>
            })()}

            {(() => {
                return sickDay.status === 'pending' ?
                    <td><button onClick={() => setDeleteForm(true)} className={style.deleteDayButton}><span>Delete</span></button></td>
                    :
                    <td>-</td>
            })()}

            {(() => {
                return sickDay.status === 'pending' ?
                    <td><button onClick={() => setManageForm(true)} className={style.manageButton}><span>Manage</span></button></td>
                    :
                    <td>-</td>
            })()}

            <ReactModal
                isOpen={isEditFormVisible}
                onRequestClose={() => setEditForm(false)}
                contentLabel="Example Modal"
                style={customStyles}
                ariaHideApp={false}
            >
                <form onSubmit={handleSubmit(onEdit)}>
                    <h2>Edit working day</h2>
                    <input type="hidden" id="sickDayId" name="sickDayId" ref={register()} />
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

                    <label>Reason</label>
                    <textarea name="reason" ref={register}></textarea>
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
                <button onClick={() => handleDelete(sickDay._id)} >Yes</button>
                <button onClick={() => setDeleteForm(false)}>No</button>
            </ReactModal>

            <ReactModal
                isOpen={isManageFormVisible}
                onRequestClose={() => setManageForm(false)}
                contentLabel="Example Modal"
                style={customStylesDelete}
                ariaHideApp={false}
            >
                <h1>Choose how to manage this period: </h1>
                <button onClick={() => handleApproval(sickDay._id)}>Approve</button>
                <button onClick={() => handleDecline(sickDay._id)} >Decline</button><br /><br />
                <button onClick={() => setManageForm(false)}>Close</button>
            </ReactModal>

            <ReactModal
                isOpen={isReasonModalVisible}
                onRequestClose={() => setReasonModal(false)}
                contentLabel="Example Modal"
                style={customStylesDelete}
                ariaHideApp={false}
            >
                <h1>Reason for the period from {sickDay.from.substring(0, 10)} to {sickDay.to.substring(0, 10)} by {(sickDay.username)}: </h1><br />
                <p> - {sickDay.reason}</p><br />
                <button onClick={() => setReasonModal(false)}>Close</button>
            </ReactModal>
        </tr>
    )
}