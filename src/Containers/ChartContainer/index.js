import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Typography } from "antd";
import AutoSizer from "react-virtualized-auto-sizer";
import Gauge from "../../Components/Charts/Gauge";
import MultiLine from "../../Components/Charts/Multiline";
import ResizeObserver from "../../Common/ResizeObserver";
import "./ChartContainer.css";

const { Title } = Typography;

function ChartContainer(props) {
  const [initData, updateInitData] = useState({ status: "loading" });
  useEffect(() => {
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://mcharts.herokuapp.com/cpuLoad"
        : "http://localhost:5001/cpuLoad"
    )
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          updateInitData(data);
        } else {
          updateInitData(data);
        }
      })
      .catch(exception => {
        updateInitData({ status: 500 });
      });
  }, []);

  const [hoverData, updateHover] = useState(null);
  const [percentCompleted, updatePercentCompleted] = useState(0);
  if (initData.status === 200) {
    const { strokes, data, totalCores } = initData;
    function updateHoverData(newHoverData) {
      let totalCoresUsed = 0;
      if (newHoverData) {
        totalCoresUsed = newHoverData.yPoints.reduce(
          (sum, data) => sum + data.value,
          0
        );
      }
      updateHover(newHoverData);
      updatePercentCompleted((totalCoresUsed * 100) / totalCores);
    }
    return (
      <>
        <Row style={{ height: "25vh" }}>
          {/* <Col span={24}> */}
          <AutoSizer>
            {({ width, height }) => {
              // const aspectRatio = (height - 20) / width;
              // width > height ? height / width : width / height;
              return width && height ? (
                <svg width={width} height={height}>
                  <Gauge
                    width={width}
                    height={height - 20}
                    innerRadius={height - 20}
                    outerRadius={height - 80}
                    percentCompleted={percentCompleted}
                  />
                  {/* <MultiLine /> */}
                </svg>
              ) : null;
            }}
          </AutoSizer>
          {/* </Col> */}
        </Row>
        <Row>
          <Title level={3}>CPU</Title>
        </Row>

        <Row style={{ height: "45vh" }}>
          <Col span={20} style={{ height: "100%" }}>
            <AutoSizer>
              {({ width, height }) =>
                width && height ? (
                  <svg width={width} height={height}>
                    <MultiLine
                      width={width}
                      height={height - 60}
                      data={data}
                      hoverData={hoverData}
                      updateHoverData={updateHoverData}
                      strokes={strokes}
                    />
                  </svg>
                ) : null
              }
            </AutoSizer>
          </Col>
          <Col span={4}>
            {hoverData ? (
              <div className="legend">
                <h5>{hoverData.label.toLocaleTimeString()}</h5>
                <div className="legend-tabs">
                  {hoverData.yPoints.map((data, index) => (
                    <div key={index} style={{ paddingBottom: "4px" }}>
                      <b
                        style={{
                          color: strokes[index]
                        }}
                      >
                        Core {index}:{" "}
                      </b>
                      <b>{data.value.toFixed(3)}</b>
                      <div
                        style={{
                          width: "40px",
                          height: "2px",
                          background: strokes[index]
                          // display: "inline-block"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Title level={3}>Disk</Title>
        </Row>
      </>
    );
  } else if (initData.status === "loading") {
    return (
      <div className="loader-container">
        <div className="loader">
          <Spin tip="Loading..." />
        </div>
      </div>
    );
  } else {
    return (
      <h1>There was an error while loading the data! Please try again.</h1>
    );
  }
}

export default ResizeObserver(ChartContainer);
