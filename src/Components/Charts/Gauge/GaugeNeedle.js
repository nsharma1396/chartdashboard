import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

function GaugeNeedle({ cx, cy, needleWidth, needleHeight, rotateAngle }) {
  const transformProps = useSpring({
    from: { transform: `rotate(-90)` },
    to: { transform: `rotate(${rotateAngle})` },
    config: {
      friction: 12
      // mass: 2
    }
  });
  return (
    <animated.g transform={transformProps.transform}>
      <circle cx={cx} cy={cy} r={needleWidth / 2} fill="red" />
      <polygon
        points={`${cx - needleWidth / 2},0 ${cx +
          needleWidth / 2},0 ${cx},${cy - needleHeight}`}
        fill="red"
      />
      {/* <path d="M10,0 a60,60 0 0,0 115,0" fill="#D78500" /> */}
    </animated.g>
  );
}

GaugeNeedle.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  needleWidth: PropTypes.number,
  needleHeight: PropTypes.number,
  rotateAngle: PropTypes.number
};

export default GaugeNeedle;
