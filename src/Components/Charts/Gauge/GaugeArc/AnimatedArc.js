import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "react-spring";

function AnimatedArc({ pathObj, animateFrom, animateArc, gaugeArc, ...props }) {
  const [showBackground, updateShowBackground] = useState(true);
  const prevAngle = useRef(pathObj.startAngle);

  const [pathProps, updatePathProps] = useSpring(() => ({
    from: {
      endAngle: prevAngle.current
    },
    to: { endAngle: pathObj.endAngle },
    onStart: () => {
      updateShowBackground(true);
    },
    onRest: () => {
      updateShowBackground(false);
    }
  }));

  useEffect(() => {
    updatePathProps({
      from: {
        endAngle: prevAngle.current
      },
      to: { endAngle: pathObj.endAngle },
      onStart: () => {
        updateShowBackground(true);
      },
      onRest: () => {
        updateShowBackground(false);
      }
    });
  }, [pathObj, updatePathProps]);

  useEffect(() => {
    prevAngle.current = pathObj.endAngle;
  }, [pathObj.endAngle]);

  return (
    <>
      {showBackground && <path {...props} d={gaugeArc(pathObj)} fill="grey" />}
      <animated.path
        {...props}
        d={pathProps.endAngle.interpolate(angle =>
          gaugeArc({
            ...pathObj,
            endAngle: angle
          })
        )}
      />
    </>
  );
}

export default AnimatedArc;
