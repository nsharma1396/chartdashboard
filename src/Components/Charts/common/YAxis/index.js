import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";

function YAxis({ height, margins, yScale }) {
  const axisRef = useRef(null);

  useEffect(() => {
    if (axisRef.current) {
      const axisElem = select(axisRef.current);
      axisElem
        .attr("transform", `translate(0,${height - margins.bottom})`)
        .attr("transform", `translate(${margins.left},0)`)
        .call(axisLeft(yScale));
    }
  }, []);

  return <g ref={axisRef} />;
}

export default YAxis;
