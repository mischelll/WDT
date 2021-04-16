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
    const [isRequestDayFormVisible, setRequestDayForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

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
console.log('kj.hkjh');
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
                if (day.hasOwnProperty('error')) {
                    setError(day.error);
                    console.log(error);
                    console.log(day);
                } else {
                    closeModal();
                }
            })
            .catch(e => e.message);
    }

    function closeModal() {
        console.log('kjhkjh');
        setRequestDayForm(false)
        setError("");
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
                onRequestClose={() => closeModal()}
                contentLabel="Example Modal"
                style={customStyles}
                ariaHideApp={false}
            >

                <form className={style.editForm} onSubmit={handleSubmit(onSubmit)}>
                    {error &&
                        <>
                            <p className={style.errorMessage}>{error}</p>

                        </>
                    }
                    <h2 className={style.reqHeading}>Request sick days period</h2>
                    <label className={style.reqHeading}>Start time</label>
                    <DatePicker
                        className={style.editForm}
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={addDays(new Date(), 0)}

                    />

                    <label className={style.reqHeading}>End time</label>
                    <DatePicker
                        className={style.editForm}
                        selected={endDate + 1}
                        onChange={date => setEndDate(date)}
                        minDate={addDays(startDate, 1)}
                        isClearable={true}
                    />
                    <textarea name="reason" ref={register}></textarea>
                    <button>Request</button>
                    {error && <><p></p></>}
                </form>
            </ReactModal>


            <table className={style.tableBody}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Status</th>
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
                <SickDayRow key={x._id} sickDay={x} />
            );
        } else {
            return <h2>No sick days</h2>
        }
    }
}