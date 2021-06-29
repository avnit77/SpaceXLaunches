import React from "react";
import {
  FaInfoCircle,
  FaRocket
} from "react-icons/fa";
import { DefaultTooltip as Tooltip } from "../Tooltip";

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

  export { DateCell, InfoCell }