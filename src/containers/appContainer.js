import React from "react";
import Graph from "../views/graph";
import * as graphConst from '../constants/graph';

export default class AppContainer extends React.Component {
  componentDidMount() {
    requestAnimationFrame(this.tick.bind(this));
  }
  tick() {
    let self = this;
    setTimeout(function() {
      self.props.addStep();
      requestAnimationFrame(self.tick.bind(self));
      self.forceUpdate();
    }, graphConst.GRAPH_SPEED);
  }
  render() {
    return (
      <div>
        <Graph
          dataArr={this.props.graph.dataLine}
          dataCircle={this.props.graph.dataCircle}
          timer={this.props.graph.timer}
        />
      </div>
    );
  }
}
