import React from "react";
import AnimatedArc from "./AnimatedArc";

function GaugeArc({ animateArc, ...props }) {
  if (animateArc) {
    return <AnimatedArc {...props} />;
  } else {
    const { pathObj, gaugeArc, ...restProps } = props;
    return <path d={gaugeArc(pathObj)} {...restProps} />;
  }
}

export default GaugeArc;
