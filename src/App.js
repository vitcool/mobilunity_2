import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";

class App extends Component {
  dataArr = [{ x: 0, y: 0 }];
  dataCircle = [
    {
      x_axis: 120,
      y_axis: 200,
      radius: 20,
      color: "green"
    }
  ];
  timer = 1;
  width = 0;
  bodyWidth = window.innerWidth * 0.8;
  height = 300;
  componentDidMount() {
    setInterval(this.tick.bind(this, null), 180);
  }
  tick() {
    var y = this.getRandomArbitrary(70, 90);
    this.timer++;
    var timer = this.timer;
    if (timer > 100) {
      this.dataArr.shift();
    }

    this.dataArr.push({ x: this.timer, y: y });

    let forward = this.dataCircle[0].x_axis;
    if (this.timer < this.bodyWidth / 10) {
      this.width = timer * 10 - 10;
      forward = this.width - 10;
    }
    this.dataCircle.push({
      x_axis: forward,
      y_axis: this.height - 3 * y,
      radius: 6,
      color: "green"
    });
    this.dataCircle.shift();
    this.forceUpdate();
  }
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  drawChart() {
    d3.selectAll("svg > *").remove();

    const width = this.width;
    const height = 300;

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3
      .select(this.rootNode)
      .attr("width", width)
      .attr("height", height)
      .append("g");

    // Scale the range of the data
    x.domain([this.dataArr[0].x, this.dataArr[this.dataArr.length - 1].x + 1]);
    y.domain([0, 100]);

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
        return d.x_axis;
      })
      .attr("cy", function(d) {
        return d.y_axis;
      })
      .attr("r", function(d) {
        return d.radius;
      })
      .attr("class", "circle");
  }
  render() {
    // only start drawing (accessing the DOM) after the first render, once we get hold on the ref of the node
    if (this.rootNode) {
      this.drawChart();
    } else {
      // setTimeout necessary for the very first draw, to ensure drawing using a DOMNode and prevent the following error:
      // "Uncaught TypeError: Cannot read property 'ownerDocument' of null"
      setTimeout(() => this.drawChart(), 0);
    }
    return (
      <div className="App">
        <svg ref={node => (this.rootNode = node)} />
      </div>
    );
  }
}

export default App;
