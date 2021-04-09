import style from './VacationDay.module.css'
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getVacationDaysByUser } from '../../service/vacationDayService';

export default function VacationDay() {
    const { currentUser } = useContext(UserContext);
    const [vacationDays, setVacationDays] = useState([]);
    const [revenue, setRevenue] = useState();

    useEffect(() => {
        if (currentUser._id) {
            getVacationDaysByUser(currentUser._id)
                .then(data => {
                    setVacationDays(data);
                })
        }

    }, [setVacationDays, currentUser._id]);

    return (
        <div>
            <button className={style.requestVacaDaysButton}>+ Request new vacation period</button>
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
                    {mapVacationDays()}
                    {mapVacationDays()}
                    {mapVacationDays()}
                    {mapVacationDays()}
                    {mapVacationDays()}
                    {mapVacationDays()}
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
                <td><button className={style.editDayButton}><span>Edit</span></button></td>
                <td><button className={style.deleteDayButton}><span>Delete</span></button></td>
            </tr>
            );
        }else{
            return <h2>No vacation days</h2>
        }
    }
}