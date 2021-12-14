import React, { useMemo } from 'react'
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table'
import { COLUMNS } from "./columns"
import CurrentDate from './components/CurrentDate';
import './css/Tables.css'


function Processes() {

    const { state } = useLocation();
    const serverUserInfo = state[0]
    console.log(serverUserInfo)
    
    const navigate = useNavigate();
    const columns = useMemo(() => COLUMNS, [])

    //Transform the data to the correct format
    let serverUserInfoObjectArray = []

    for (let x in serverUserInfo.assignedProcesses) {
        let serverUserInfoObject = {}
        serverUserInfoObject.assignedProcesses = serverUserInfo.assignedProcesses[x]
        serverUserInfoObject.dueDate = new Date((serverUserInfo.dueDate[x]).split('EET')).toLocaleString()
        serverUserInfoObjectArray.push(serverUserInfoObject)
    }

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
            alert("Please click the Process's name instead of the date")
        }
        else {
            navigate("/" + processName, { state: [serverUserInfo, processName] })
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
