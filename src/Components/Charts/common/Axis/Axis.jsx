import React, { Component } from "react";
import * as d3 from "d3";
import * as d3Axis from "d3-axis";
import { select as d3Select } from "d3-selection";

import "./Axis.css";
import { timeFormat } from "d3-time-format";

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const t = d3.transition().duration(500);

    const axisType = `axis${this.props.orient}`;
    let axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickPadding([12])
      // .ticks([10]);

    // if(this.props.tickSize)
    //   axis = axis.tickSize(-this.props.tickSize)

    if (this.props.tickFormat) {
      axis = axis.tickFormat(timeFormat("%H:%M:%S"));
    }

    d3Select(this.axisElement)
      .transition(t)
      .call(axis);
  }

  render() {
    return (
      <g
        className={`Axis Axis-${this.props.orient}`}
        ref={el => {
          this.axisElement = el;
        }}
        transform={this.props.translate}
      />
    );
  }
}
