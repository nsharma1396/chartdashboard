import React, { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";

function XAxis({ height, width, margins, xScale }) {
  const axisRef = useRef(null);

  useEffect(() => {
    if (axisRef.current) {
      const axisElem = select(axisRef.current);
      axisElem
        .attr("transform", `translate(0,${height - margins.bottom})`)
        .call(
          axisBottom(xScale)
            .ticks(width / 80)
            .tickSizeOuter(0)
        );
    }
  }, []);

  return <g ref={axisRef} />;
}

export default XAxis;
