import React, { useMemo } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table'
import { COLUMNS } from "./columns"
import CurrentDate from './components/CurrentDate';
import './css/Tables.css'


function Processes() {

    const { state } = useLocation();
    const loginUserInfo = state[0]
    const allUsers = state[1]
    const navigate = useNavigate();
    console.log(allUsers)

    const columns = useMemo(() => COLUMNS, [])
    var serverUserInfo = useMemo(() => allUsers.find(user => (user.username === loginUserInfo.username && user.password === loginUserInfo.password)), [allUsers,loginUserInfo])
    console.log(serverUserInfo)


    //Transform the data to the correct format
    let serverUserInfoObjectArray = []

    for (let x in serverUserInfo.assignedProcesses) {
        let serverUserInfoObject = {}
        serverUserInfoObject.assignedProcesses = serverUserInfo.assignedProcesses[x]
        serverUserInfoObject.dueDate = new Date((serverUserInfo.dueDate[x]).split('EET')).toLocaleString()
        serverUserInfoObjectArray.push(serverUserInfoObject)
    }
    console.log(serverUserInfoObjectArray)


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: serverUserInfoObjectArray
    })

    function goto(event) {

        var processName = event.target.textContent

        if (processName.includes(":") || processName.includes("/")) {
            //the user clicked the dueDate and not the process
            alert("Please click the Processe's name instead of the date")
        }
        else {
            navigate("/" + processName, { state: [serverUserInfo, processName, loginUserInfo] })
        }
    }


    return (


        <div className="TableContainer">
            <CurrentDate />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (

                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}><b>{column.render('Header')}</b></th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}><button onClick={goto}>{cell.render('Cell')}</button></td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>


    )
}

export default Processes
