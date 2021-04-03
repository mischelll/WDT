import style from './SickDay.module.css';
import React, { useEffect, useState } from 'react';

export default function SickDayComponent() {
    const [sickDays, setSickDays] = useState([]);
    const [revenue, setRevenue] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/api/sickDay', {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' +  sessionStorage.getItem("AUTH_TOKEN_KEY") }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setSickDays(data);

            })
            .catch(err => console.log(err.message));

    }, [setSickDays]);

    return (
        <div>
            <button className={style.requestVacaDaysButton}>+ Request new sick days</button>
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
            return sickDays.map(x => <tr key={x._id}>
                <td>{x.from.substring(0, 10)}</td>
                <td>{x.to.substring(0, 10)}</td>
                <td>{x.reason}</td>
                <td>395 $</td>
                <td>{x.user}</td>
            </tr>
            );
        }
    }
}