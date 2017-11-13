import React from "react";
import * as d3 from "d3";
import * as graphConst from '../constants/graph'

export default class Graph extends React.Component {
  dataArr = this.props.dataArr;
  dataCircle = this.props.dataCircle;

  drawChart() {
    d3.selectAll("svg > *").remove();
    const height = graphConst.GRAPH_HEIGHT; 
    let width = graphConst.GRAPH_WIDTH;

    if (this.props.timer < width) {
      width = this.props.timer;
    }

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(this.rootNode)
      .attr("width", width)
      .attr("height", height)
      .append("g");

    x.domain([this.dataArr[0].x, this.dataArr[this.dataArr.length - 1].x + 10]);
    y.domain([0, graphConst.GRAPH_MAX_VALUE]);

    const valueLine = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    var area = d3
      .area()
      .x(function(d) {
        return x(d.x);
      })
      .y0(height)
      .y1(function(d) {
        return y(d.y);
      });

    svg
      .append("path")
      .data([this.dataArr])
      .attr("class", "area")
      .attr("d", area);

    svg
      .append("path")
      .data([this.dataArr])
      .attr("class", "line")
      .attr("d", valueLine);

    var circle = svg
      .selectAll("circle")
      .data(this.dataCircle)
      .enter()
      .append("circle");

    circle
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      })
      .attr("r", function(d) {
        return d.radius;
      })
      .attr("class", "circle");
  }
  render() {
    if (this.rootNode) {
      this.drawChart();
    } else {
      setTimeout(() => this.drawChart(), 0);
    }
    return <svg ref={node => (this.rootNode = node)} />;
  }
}
