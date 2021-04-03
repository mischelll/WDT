import style from './VacationDay.module.css'
import React, { useEffect, useState } from 'react';

export default function VacationDay() {
    const [vacationDays, setVacationDays] = useState([]);
    const [revenue, setRevenue] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/api/vacationDay', {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("AUTH_TOKEN_KEY") }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setVacationDays(data);

            })
            .catch(err => console.log(err.message));

    }, [setVacationDays]);

    return (
        <div>
            <button className={style.requestVacaDaysButton}>+ Request new vacation period</button>
            <table className={style.tableBody}>
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
            </tr>
            );
        }
    }
}