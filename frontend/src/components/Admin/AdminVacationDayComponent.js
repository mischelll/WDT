import style from '../VacationDay/VacationDay.module.css'
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getAllVacationDays } from '../../service/vacationDayService';
import AdminVacationDayRowComponent from '../Admin/AdminVacationDayRowComponent';
import Loader from "react-loader-spinner";

export default function VacationDay() {
    const { currentUser } = useContext(UserContext);
    const [vacationDays, setVacationDays] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser._id) {
            getAllVacationDays()
                .then(data => {
                    setVacationDays(data);
                    setLoading(false)
                })
        }
    }, [setVacationDays, currentUser._id]);


    if (isLoading) {
        return (
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={5000} //3 secs
            />
        )
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
                        <td>Count of pending periods: {vacationDays?.filter(x => x.status === 'pending').length}</td>
                        <td>Count of approved periods: {vacationDays?.filter(x => x.status === 'approved').length} </td>
                        <td>Count of declined periods: {vacationDays?.filter(x => x.status === 'declined').length}</td>
                        <td>Most requested periods by: {vacationDays?.map(x => x.username).sort((a, b) =>
                            vacationDays.filter(v => v === a).length - vacationDays.filter(v => v === b).length).pop()}
                            </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

    function mapVacationDays() {
        if (vacationDays.length > 0) {
            return vacationDays.map(vacationDay =>
                <AdminVacationDayRowComponent vacationDay={vacationDay} spinnerLoading={setLoading}/>
            );
        } else {
            return <h2>No vacation days</h2>
        }
    }
}