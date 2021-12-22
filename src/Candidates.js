import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from "./columns"


function Candidates(props) {

    const columns = useMemo(() => COLUMNS, [])
    const candidates = useMemo(() => props.candidates, [props.candidates])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: candidates
    })

    return (

        <div style={{ overflowY: 'scroll', maxHeight: 200, marginTop: 10, marginLeft: 0, marginRight: 0 }}>
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
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default Candidates
