import React, { useMemo } from 'react'
import { useTable } from 'react-table'

    const DateCell = ({ value }) => {
        return value ? value.slice(0,4) : null
    }

    const createColumns = () => [
        {
            Header: 'Flight Number',
            accessor: 'flight_number',
        },
        {
            Header: 'Launch Year',
            accessor: 'date_utc',
            Cell: ({ cell }) => (
                <DateCell value={cell.value} />
            ),
        },
        {
            Header: 'Rocket Name',
            accessor: 'rocket',
        },
        {
            Header: 'Details',
            accessor: 'details',
        }
    ]

const LaunchTable = ({ launches }) => {

    const columns = useMemo(() => createColumns(), [])
    const tableData = useMemo(() => launches, [launches])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tableData,
    })

    return (
        <>
            <table
                {...getTableProps()}
                className="table is-fullwidth is-hoverable"
                style={{ backgroundColor: 'inherit' }}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        const rowProps = row.getRowProps()
                        return (
                            <tr {...rowProps}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{ position: 'relative' }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default LaunchTable