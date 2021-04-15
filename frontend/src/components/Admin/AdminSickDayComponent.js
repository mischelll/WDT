import style from './AdminSickDayComponent.module.css';
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getAllSickDays } from '../../service/sickDayService';
import { Popup } from '../Popup/Popup';
import DatePicker from "react-date-picker";

export default function SickDayComponent() {
    const { currentUser } = useContext(UserContext);
    const [sickDays, setSickDays] = useState([]);
    const [revenue, setRevenue] = useState();
    const [isEditFormVisible, setEditForm] = useState(false);
    const [isDeleteFormVisible, setDeleteForm] = useState(false);
    const [isManageFormVisible, setManageForm] = useState(false);
    const [isRequestDayFormVisible, setRequestDayForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startEditDate, setstartEditDate] = useState(new Date());
    const [endEditDate, setendEditDate] = useState(new Date());
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        getAllSickDays()
            .then(data => {
                setSickDays(data);
            })


    }, [setSickDays]);



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

    return (
        <div>
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
                <button onClick={handleDelete} >Yes</button>
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
                <button onClick={handleApproval} >Approve</button>
                <button onClick={handleDecline} >Decline</button><br /><br />
                <button onClick={() => setManageForm(false)}>Close</button>
            </ReactModal>

            <ReactModal
                isOpen={isManageFormVisible}
                onRequestClose={() => setManageForm(false)}
                contentLabel="Example Modal"
                style={customStylesDelete}
                ariaHideApp={false}
            >
                {/* <h1>Reason for the period of {x.from.substring(0, 10)}-{x.to.substring(0, 10)} by {(x.username)}: </h1>
                <p>{x.reason}</p><br />
                <button onClick={() => setManageForm(false)}>Close</button> */}
            </ReactModal>
            <table className={style.tableBody}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Missed working days</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {mapSickDays()}
                </tbody>
            </table>
        </div>
    )


    function handleDelete(e) {
        console.log(e);
    }

    function handleApproval(e) {

    }

    function handleDecline(e) {

    }

    function mapSickDays() {
        if (sickDays.length > 0) {
            return sickDays.map(x =>
                <tr key={x._id}>
                    <td>{x.from.substring(0, 10)}</td>
                    <td>{x.to.substring(0, 10)}</td>
                    {
                        <>
                            <h1>Reason for the period of {x.from.substring(0, 10)}-{x.to.substring(0, 10)} by {(x.username)}: </h1>
                            <td><button onClick={() => setManageForm(true)} className={style.editDayButton}><span>See reason</span></button></td>

                        </>

                    }
                    <td>{x.status}</td>
                    <td>{x.username}</td>

                    {(() => {
                        return x.status === 'pending' ?
                            <td><button onClick={() => setEditForm(true)} className={style.editDayButton}><span>Edit</span></button></td> :
                            x.status === 'approved' ?
                                <td><Popup info="tick" /></td>
                                :
                                <td><Popup info="info" /></td>
                    })()}

                    {(() => {
                        return x.status === 'pending' ?
                            <td><button onClick={() => setDeleteForm(true)} className={style.deleteDayButton}><span>Delete</span></button></td>
                            :
                            <td>-</td>
                    })()}

                    {(() => {
                        return x.status === 'pending' ?
                            <td><button onClick={() => setManageForm(true)} className={style.manageButton}><span>Manage</span></button></td>
                            :
                            <td>-</td>
                    })()}
                </tr>
            );
        } else {
            return <h2>No sick days</h2>
        }
    }
}