import React from "react";
import Axis from "../Axis/Axis";
import { timeFormat } from "d3-time-format";

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions;

  const xProps = {
    orient: "Bottom",
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
    tickFormat: timeFormat("%Y-%m-%d")
  };

  const yProps = {
    orient: "Left",
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  };

  return (
    <>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </>
  );
};
