import React from "react";

const ProgressBar = props => {
  const { completed, className, option } = props;

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#e5e5e5",
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 10s ease-in-out",
    position: "relative",
  };

  const labelStyles = {
    position: "absolute",
    color: "black",
    fontWeight: "bold",
    left: "1rem",
    zIndex: "999",
  };

  const labelPercentStyles = {
    color: "#5469D4",
    fontWeight: "normal",
  };

  return (
    <div
      style={{ lineHeight: "2.5", position: "relative" }}
      className={className}
    >
      <div style={labelStyles}>
        {
          <span>
            <span>{option}</span> &nbsp;
            <span style={labelPercentStyles}>{`${completed}%`}</span>
          </span>
        }
      </div>
      <div style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
