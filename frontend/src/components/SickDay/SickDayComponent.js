import style from './SickDay.module.css';
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getSicknDaysByUser } from '../../service/sickDayService';
import { Popup } from '../Popup/Popup';
import DatePicker from "react-date-picker";
import SickDayRow from './SickDayRow';

export default function SickDayComponent() {
    const { currentUser } = useContext(UserContext);
    const [sickDays, setSickDays] = useState([]);
    const [revenue, setRevenue] = useState();
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
            getSicknDaysByUser(currentUser._id)
                .then(data => {
                    setSickDays(data);
                })
        }

    }, [setSickDays, currentUser._id]);

    function onSubmit(e) {

        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 1)

        fetch('http://localhost:8082/api/sickDay', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "from": startDate?.toISOString().slice(0, 10),
                    "to": endDate?.toISOString().slice(0, 10),
                    "reason": e.reason
                }
            )
        })
            .then(data => data.json())
            .then(day => {
                console.log(day);
            })
            .catch(e => e.message);
    }

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

    

    return (
        <div>
            <button className={style.requestSickDaysButton} onClick={() => setRequestDayForm(true)}>+ Request new sick days</button>
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
                        minDate={addDays(startDate, 1)}
                        isClearable={true}
                    />
                    <textarea name="reason" ref={register}></textarea>
                    <button>Request</button>
                </form>
            </ReactModal>

           
            <table className={style.tableBody}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Missed working days</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {mapSickDays()}
                </tbody>
            </table>
        </div>
    )

    function mapSickDays() {
        if (sickDays.length > 0) {
            return sickDays.map(x =>
                <SickDayRow sickDay={x} />
            );
        } else {
            return <h2>No sick days</h2>
        }
    }
}