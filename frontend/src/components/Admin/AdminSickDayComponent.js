import style from './AdminSickDayComponent.module.css';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { getAllSickDays } from '../../service/sickDayService';
import AdminSickDayRowComponent from './AdminSickDayRowComponent';
import Loader from "react-loader-spinner";

export default function SickDayComponent() {
    const { currentUser } = useContext(UserContext);
    const [sickDays, setSickDays] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllSickDays()
            .then(data => {
                setSickDays(data);
                setLoading(false);
            })


    }, [setSickDays]);

    if (isLoading) {
        return (
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={5000}
            />
        )
    }


    return (
        <div>

            <table className={style.tableBody}>
                <thead className={style.tableHead}>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {mapSickDays()}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Most requested periods by: {sickDays.map(x => x.username).sort((a, b) =>
                            sickDays.filter(v => v === a).length - sickDays.filter(v => v === b).length).pop()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

    function mapSickDays() {
        if (sickDays.length > 0) {
            return sickDays.map(sickDay =>
                <AdminSickDayRowComponent sickDay={sickDay} spinnerLoading={setLoading} />
            );
        } else {
            return <h2>No sick days</h2>
        }
    }
}