import React, { useState, useEffect } from "react";
import { arc } from "d3";
import { pie } from "d3-shape";
import GaugeNeedle from "./GaugeNeedle";
import GaugeArc from "./GaugeArc/index";

// const stub2 = [
//   { label: "a", value: 100, success: true },
//   { label: "b", value: 0 }
// ];
// const stub1 = [
//   { label: "a", value: 60, success: true },
//   { label: "b", value: 40 }
// ];

function GaugeRenderer({
  // data: stubData,
  gaugeData,
  endAngle,
  startAngle,
  width,
  height,
  innerRadius,
  outerRadius,
  percentCompleted
}) {
  // const [gaugeData, updateGaugeData] = useState(stubData);
  const translateX = width / 2,
    translateY = height;

  const gaugePie = pie()
    .value(data => data.value)
    .sort((a, b) => {
      return a.success ? -1 : b.success ? 1 : 0;
    })
    .startAngle((startAngle * Math.PI) / 180)
    .endAngle((endAngle * Math.PI) / 180);

  const gaugeArc = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const pieData = gaugePie(gaugeData).sort((a, b) => (a.data.success ? 1 : -1));

  let needleAngleObj = {};

  return (
    <g transform={`translate(${translateX}, ${translateY})`}>
      {pieData.map((dataObj, index) => {
        if (dataObj.data.success) {
          needleAngleObj = dataObj;
        }
        return (
          <GaugeArc
            key={index}
            animateArc={!!dataObj.data.success}
            pathObj={dataObj}
            gaugeArc={gaugeArc}
            fill={dataObj.data.success ? "blue" : "grey"}
          />
        );
      })}
      <GaugeNeedle
        cx={0}
        cy={0}
        needleWidth={20}
        needleHeight={innerRadius + 10}
        rotateAngle={(needleAngleObj.endAngle * 180) / Math.PI}
      />
      <text
        x={0}
        y={(-2 * innerRadius) / 3}
        fill="white"
        fontSize="2em"
        textAnchor="middle"
      >
        {percentCompleted ? percentCompleted.toFixed(2) : "-"}
      </text>
    </g>
  );
}

function Gauge({ percentCompleted, ...props }) {
  const data = [
    { label: "arc1", value: percentCompleted, success: true },
    { label: "arc2", value: 100 - percentCompleted }
  ];
  return (
    <GaugeRenderer
      {...props}
      percentCompleted={percentCompleted}
      gaugeData={data}
    />
  );
}

Gauge.defaultProps = {
  // translateX: window.innerWidth / 2,
  // translateY: window.innerHeight / 2,
  // data: stub1,
  percentCompleted: 0,
  startAngle: -65,
  endAngle: 65,
  innerRadius: 250,
  outerRadius: 150
};

export default Gauge;
