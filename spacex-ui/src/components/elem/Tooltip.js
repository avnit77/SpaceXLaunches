import React from "react";
import ReactTooltip from "react-tooltip";

const Tooltip = ({ id, extraClass, stayOpen, place }) => {
  return (
    <ReactTooltip
      id={id}
      className={`tooltipHover ${extraClass ? extraClass : ""}`}
      place={place ? place : "top"}
      delayHide={stayOpen ? 250 : 0}
      effect="solid"
      html={true}
      type="light"
    />
  );
};

const DefaultTooltip = ({ id, className, place }) => (
  <Tooltip extraClass={className} id={id} stayOpen={true} place={place} />
);

export default DefaultTooltip;

export { DefaultTooltip, Tooltip };
