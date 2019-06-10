import React, { useRef } from "react";
import { line } from "d3-shape";
// import { clientPoint } from "d3-selection";
// import { bisector } from "d3-array";

function Line({
  data,
  xScale,
  yScale,
  stroke,
  // handleMouseOver,
  currentHover,
  lineKey
}) {
  // const pathRef = useRef();
  const lineGenerator = line()
    .x(d => xScale(d.label))
    .y(d => yScale(d.value));

  return (
    <g
    // onMouseMove={ev => {
    //   const clientPt = clientPoint(ev.target, ev);
    //   // const bisectorFunc = bisector(function(d) {
    //   //   console.log("s", d);
    //   //   return d.label;
    //   // }).left;

    //   // console.log(bisectorFunc(xScale.invert(clientPt[0])));

    //   handleMouseOver({
    //     // clientPt,
    //     // bisectorFunc({
    //     label: clientPt[0],
    //     value: clientPt[1]
    //     // bisectIndex: bisectorFunc(xScale.invert(clientPt[0])),
    //     // lineKey
    //     // })
    //   });
    //   //currentHover.bisectIndex
    // }}
    // onMouseOut={ev => {
    //   handleMouseOver();
    // }}
    >
      <path
        // ref={pathRef}
        id={`${lineKey}`}
        d={lineGenerator(data)}
        stroke={stroke}
        strokeWidth="3px"
        fill="none"
        style={{ cursor: "pointer" }}
      />
      {currentHover && (
        <circle cx={currentHover.x} cy={currentHover.y} r={5} fill={stroke} />
      )}
    </g>
  );
}

export default Line;
