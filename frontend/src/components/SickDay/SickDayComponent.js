import style from './SickDay.module.css';
import React, { useEffect, useState } from 'react';

export default function SickDayComponent(){
    const [sickDays, setSickDays] = useState([]);
    const[revenue, setRevenue] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/api/sickDay', {
            method: "GET",
            headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MDU2MDVjMGYxMDdmNTE2OThkMWIxOGUiLCJ1c2VybmFtZSI6InBlc2hvIiwiZW1haWwiOiJwZXNob0BtYWlsLmNvbSIsInJvbGVzIjpbIjYwNTVmMTRmZTU5ZGRhMjhmODIxY2EyZSJdLCJpYXQiOjE2MTY5MzEzMDgsImV4cCI6MTYxNzAxNzcwOH0.QNSFDYOR3yZkRlV2SlXS8M8Jl3216Vlpe1XhyVAj41Y' }
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
                {sickDays.map(x =>
                        <tr key={x._id}>
                            <td>{x.from.substring(0,10)}</td>
                            <td>{x.to.substring(0,10)}</td>
                            <td>{x.reason}</td>
                            <td>395 $</td>
                            <td>{x.user}</td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    )
}