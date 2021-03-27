import style from './SickDay.module.css'

export default function SickDayComponent(){
    return (
        <div>
            <button className={style.requestVacaDaysButton}>+ Request new sick days</button>
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