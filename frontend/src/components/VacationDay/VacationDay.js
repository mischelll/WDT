import style from './VacationDay.module.css'
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getVacationDaysByUser } from '../../service/vacationDayService';
import DatePicker from "react-date-picker";
import { Popup } from '../Popup/Popup';
import VacationDayRow from './VacationDaysRow';

export default function VacationDay() {
    const { currentUser } = useContext(UserContext);
    const [vacationDays, setVacationDays] = useState([]);
    const [isRequestDayFormVisible, setRequestDayForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { handleSubmit } = useForm();
    const [error, setError] = useState("");

    useEffect(() => {
        if (currentUser._id) {
            getVacationDaysByUser(currentUser._id)
                .then(data => {
                    setVacationDays(data);
                })
        }
    }, [setVacationDays, currentUser._id]);


    function onSubmit(e) {
        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 1)

        fetch('http://localhost:8082/api/vacationDay', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "from": startDate?.toISOString().slice(0, 10),
                    "to": endDate?.toISOString().slice(0, 10)
                }
            )
        })
            .then(data => data.json())
            .then(day => {
                if (day.hasOwnProperty('error')) {
                    setError(day.error);
                    console.log(error);
                    console.log(day);
                } else {
                    closeModal();
                }

            })
            .catch(e => {
                console.log(e.message);
            });
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


    function closeModal() {
        setRequestDayForm(false)
        setError("");
    }

    function addDays(date, daysToAdd) {

        return new Date(date?.getFullYear(), date?.getMonth(), date?.getDate() + daysToAdd)
    }

    return (
        <div>
            <div className={style.reqButtonContainer}>
                <button onClick={() => setRequestDayForm(true)} className={style.requestVacaDaysButton}><span>+ Request new vacation period</span></button>
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
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>{vacationDays.map(x => x.missedWorkingDays).reduce((a, b) => a + b, 0)} missed working days</td>
                        <td>{vacationDays.map(x => x.revenue).reduce((a, b) => a + b, 0)} $ in revenue</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

    function mapVacationDays() {
        if (vacationDays.length > 0) {
            return vacationDays.map(x =>
                <VacationDayRow key={x._id} vacationDay={x} />
            );
        } else {
            return <h2>No vacation days</h2>
        }
    }
}