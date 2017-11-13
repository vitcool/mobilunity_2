import * as types from "../constants/actionTypes";
import * as graphConst from "../constants/graph";

function getNewState(state) {
  let newState = state;
  let y = getRandomArbitrary(
    graphConst.GRAPH_MIN_RANDOM,
    graphConst.GRAPH_MAX_RANDOM
  );
  let width = graphConst.GRAPH_WIDTH;
  newState.timer += graphConst.GRAPH_ADD_TIME;
  newState.dataLine = getDataLine(newState.dataLine, newState.timer, y);
  newState.dataCircle = getDataCircle(
    newState.dataCircle,
    newState.timer,
    y
  );
  return newState;
}

function getDataLine(dataLine, timer, y) {
  var newDataLine = dataLine;
  if (timer > graphConst.GRAPH_WIDTH) {
    newDataLine.shift();
  }
  newDataLine.push(stepForwardLine(timer, y));
  return newDataLine;
}

function getDataCircle(dataCircle, timer, y) {
  var newDataCircle = dataCircle;
  newDataCircle.push(stepForwardCircle(timer, graphConst.GRAPH_WIDTH, y));
  newDataCircle.shift();
  return newDataCircle;
}

function stepForwardLine(timer, y) {
  return { x: ++timer, y: y };
}

function stepForwardCircle(timer, width, y) {
  let xCircle = timer - graphConst.GRAPH_MARGIN;
  if (timer > width) {
    xCircle = width - graphConst.GRAPH_MARGIN;
  }
  let coef = graphConst.GRAPH_HEIGHT / graphConst.GRAPH_MAX_VALUE;
  return {
    x: xCircle,
    y: graphConst.GRAPH_HEIGHT - coef * y,
    radius: graphConst.GRAPH_CIRCLE_RADIUS
  };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function graph(state = [], action) {
  switch (action.type) {
    case types.ADD_STEP: {
      return getNewState(state);
    }
    default: {
      return state;
    }
  }
}

export default graph;
