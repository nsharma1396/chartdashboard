import React, { useState } from "react";
import Line from "./Line";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import Axes from "../common/Axes/Axes";
import { clientPoint } from "d3-selection";

const findYatXbyBisection = function(x, path, error) {
  let length_end = path.getTotalLength(),
    length_start = 0,
    point = path.getPointAtLength((length_end + length_start) / 2), // get the middle point
    bisection_iterations_max = 50,
    bisection_iterations = 0;

  error = error || 0.01;

  while (x < point.x - error || x > point.x + error) {
    // get the middle point
    point = path.getPointAtLength((length_end + length_start) / 2);

    if (x < point.x) {
      length_end = (length_start + length_end) / 2;
    } else {
      length_start = (length_start + length_end) / 2;
    }

    // Increase iteration
    if (bisection_iterations_max < ++bisection_iterations) break;
  }
  return point.y;
};

function MultiLine({
  data,
  width,
  height,
  updateHoverData,
  hoverData,
  strokes
}) {
  const margins = {
    top: 20,
    left: 80,
    bottom: 20,
    right: 40
  };
  const svgDimensions = {
    width,
    height
  };

  const dataValues = [].concat.apply([], data.map(datum => datum.value));

  const xScale = scaleTime()
    .range([margins.left, svgDimensions.width - margins.right])
    .domain([data[0].label, data[data.length - 1].label]);

  const yScale = scaleLinear()
    .domain(extent(dataValues))
    .range([svgDimensions.height - margins.bottom, margins.top]);

  const chartData = {};

  data.forEach(datum => {
    datum.value.map((value, index) => {
      if (!chartData[`line${index}`]) {
        chartData[`line${index}`] = [];
      }
      chartData[`line${index}`].push({ label: datum.label, value });
    });
  });

  function handleMouseOver(newPoint) {
    if (newPoint) {
      const { label, value } = newPoint;
      const xPoint = xScale.invert(label);
      const yPoints = data.map((datum, index) => {
        const y = findYatXbyBisection(
          label,
          document.getElementById("line" + index)
        );
        return { y, value: yScale.invert(y) };
      });
      // updateCurrentHover({
      //   x: xScale(xPoint),
      //   yPoints
      // });
      console.log(yPoints);
      updateHoverData({
        x: label,
        label: xPoint,
        yPoints
      });
    } else {
      // updateCurrentHover(null);
      updateHoverData(null);
    }
  }

  return (
    <g
      onMouseMove={ev => {
        const clientPt = clientPoint(ev.target, ev);
        // const bisectorFunc = bisector(function(d) {
        //   console.log("s", d);
        //   return d.label;
        // }).left;

        // console.log(bisectorFunc(xScale.invert(clientPt[0])));

        handleMouseOver({
          // clientPt,
          // bisectorFunc({
          label: clientPt[0],
          value: clientPt[1]
          // bisectIndex: bisectorFunc(xScale.invert(clientPt[0])),
          // lineKey
          // })
        });
        //currentHover.bisectIndex
      }}
      onMouseOut={ev => {
        handleMouseOver();
      }}
    >
      {Object.keys(chartData).map((lineKey, index) => (
        <Line
          key={lineKey}
          stroke={strokes[index]}
          data={chartData[lineKey]}
          currentHover={
            hoverData && { ...hoverData, y: hoverData.yPoints[index].y }
          }
          lineKey={lineKey}
          xScale={xScale}
          yScale={yScale}
          handleMouseOver={handleMouseOver}
        />
      ))}
      <Axes
        svgDimensions={svgDimensions}
        margins={margins}
        scales={{ xScale, yScale }}
      />
      <rect
        width={svgDimensions.width - margins.right - margins.left}
        height={svgDimensions.height - margins.bottom}
        x={margins.left}
        y={margins.top}
        fill="transparent"
      />
    </g>
  );
}

MultiLine.defaultProps = {
  data: []
};

export default MultiLine;
