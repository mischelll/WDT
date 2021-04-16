import style from '../VacationDay/VacationDay.module.css'
import ReactModal from 'react-modal';
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contexts/UserContext';
import { getAllVacationDays } from '../../service/vacationDayService';
import AdminVacationDayRowComponent from '../Admin/AdminVacationDayRowComponent';
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
            return vacationDays.map(vacationDay =>
                <AdminVacationDayRowComponent vacationDay={vacationDay} />
            );
        } else {
            return <h2>No vacation days</h2>
        }
    }
}