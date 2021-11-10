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
    //TODO: bres ton me username kai password anti gia fname
    var currentUserProcessTableData = useMemo(() => allUsers.find(user => user.name === loginUserInfo.fname), [allUsers, loginUserInfo])
    console.log(currentUserProcessTableData)
    const currentUserProcessTableDataArray = []
    currentUserProcessTableDataArray.push(currentUserProcessTableData)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: currentUserProcessTableDataArray
    })

    function goto(event) {

        var processName = event.target.textContent
        //TODO:chekare ksana me basi ta dates pou perneis apo to Sirius
        if (processName.includes("-"))
        {
            
        }
        else{
            navigate("/" + processName, {state: [currentUserProcessTableData,processName,loginUserInfo]})
        }

    }


    return (
    
        
         <div className="TableContainer">
            <CurrentDate/>
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
