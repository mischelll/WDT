import style from './VacationDay.module.css'
import React, { useEffect, useState } from 'react';

export default function VacationDay() {
    const [vacationDays, setVacationDays] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/vacationDay', {
            method: "GET",
            headers: { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MDU2MDVjMGYxMDdmNTE2OThkMWIxOGUiLCJ1c2VybmFtZSI6InBlc2hvIiwiZW1haWwiOiJwZXNob0BtYWlsLmNvbSIsInJvbGVzIjpbIjYwNTVmMTRmZTU5ZGRhMjhmODIxY2EyZSJdLCJpYXQiOjE2MTY5MzEzMDgsImV4cCI6MTYxNzAxNzcwOH0.QNSFDYOR3yZkRlV2SlXS8M8Jl3216Vlpe1XhyVAj41Y' }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setVacationDays(data);
                console.log(vacationDays);
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
                    {vacationDays.map(x =>
                        <tr key={x._id}>
                            <td>{x.from}</td>
                            <td>{x.to}</td>
                            <td>4</td>
                            <td>395 $</td>
                            <td>{x.status}</td>
                        </tr>
                    )}
                    <tr>
                        <td>20.02.2021</td>
                        <td>23.02.2021</td>
                        <td>4</td>
                        <td>395 $</td>
                        <td>Accepted</td>
                    </tr>
                    <tr>
                        <td>20.02.2021</td>
                        <td>22.02.2021</td>
                        <td>3</td>
                        <td>295 $</td>
                        <td>Pending</td>
                    </tr>
                    <tr>
                        <td>20.02.2021</td>
                        <td>21.02.2021</td>
                        <td>2</td>
                        <td>195 $</td>
                        <td>Declined</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}