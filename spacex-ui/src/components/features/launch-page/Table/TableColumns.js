import React from "react";
import {InfoCell, DateCell } from '../../../elem/table/Cells'

const createColumns = () => [
    {
      Header: "Flight Number",
      accessor: "flight_number",
    },
    {
      Header: "Launch Year",
      accessor: "date_utc",
      Cell: ({ cell }) => <DateCell value={cell.value} />,
    },
    {
      Header: "Rocket Name",
      accessor: "rocket",
    },
    {
      Header: "Details",
      accessor: "details",
      Cell: ({ cell, row }) => (
        <InfoCell value={cell.value} link={row.original.links} />
      ),
    },
  ];

  export default createColumns