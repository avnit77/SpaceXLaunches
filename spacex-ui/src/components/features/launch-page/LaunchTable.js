import React, { useMemo, useCallback } from "react";
import { useTable, usePagination, useSortBy, useExpanded } from "react-table";
import {
  FaAngleUp,
  FaAngleDown,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaInfoCircle,
  FaRocket,
} from "react-icons/fa";
import { DefaultTooltip as Tooltip } from "../../elem/Tooltip";

const DateCell = ({ value }) => {
  return value ? value.slice(0, 4) : null;
};

const InfoCell = ({ value, link }) => {
  return (
    <>
      {value ? (
        <span
          data-tip={`${value}`}
          data-for={"details"}
          className="icon is-size-7 is-left formHelper"
        >
          <FaInfoCircle />
          <Tooltip id={"details"} />
        </span>
      ) : null}
      {link ? (
        <a href={value} target="_blank">
          <span data-tip="View Press Kit" data-for="press">
            <FaRocket />
            <Tooltip id="press" place={"right"} />
          </span>
        </a>
      ) : null}
    </>
  );
};

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

const LaunchTable = ({ launches }) => {
  const columns = useMemo(() => createColumns(), []);
  const tableData = useMemo(() => launches, [launches]);

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre>
        {" "}
        <p>{row.original.details}</p>
      </pre>
    ),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, sortBy, expanded },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
      disableMultiSort: true,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <div className="grid">
      <table
        {...getTableProps()}
        className="table is-fullwidth is-hoverable"
        style={{ backgroundColor: "inherit" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleUp />
                      )
                    ) : (
                      ""
                    )}
                    {column.render("Header")}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);

            return (
              <React.Fragment>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td>{renderRowSubComponent({ row })}</td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="pagination" style={{ justifyContent: "center" }}>
        <div
          className={!canPreviousPage ? "has-text-grey" : "active"}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FaAngleDoubleLeft />
        </div>{" "}
        <div
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={!canPreviousPage ? "has-text-grey" : "active"}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaAngleLeft />
        </div>{" "}
        <span>
          <th className="">
            Page{" "}
            <span>
              {pageIndex + 1} of {pageOptions.length}
            </span>{" "}
          </th>
        </span>
        <div
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={!canNextPage ? "has-text-grey" : "active"}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaAngleRight />
        </div>{" "}
        <div
          className={!canNextPage ? "has-text-grey" : "active"}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaAngleDoubleRight />
        </div>{" "}
      </div>
    </div>
  );
};

export default LaunchTable;
