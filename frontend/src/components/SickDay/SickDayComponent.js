import style from './SickDay.module.css';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getSicknDaysByUser } from '../../service/sickDayService';

export default function SickDayComponent() {
    const { currentUser } = useContext(UserContext);
    const [sickDays, setSickDays] = useState([]);
    const [revenue, setRevenue] = useState();

    useEffect(() => {
        if (currentUser._id) {
            getSicknDaysByUser(currentUser._id)
                .then(data => {
                    setSickDays(data);
                })
        }

    }, [setSickDays, currentUser._id]);

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
        }else{
            return <h2>No sick days</h2>
        }
    }
}