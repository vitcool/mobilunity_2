import { createStore } from "redux";
import * as graphConst from '../constants/graph';

import rootReducer from "../reducers/index";

const defaultState = {
  graph: {
    dataLine: [{ x: 0, y: 0 }],
    dataCircle: [
      {
        x: 0,
        y: 0,
        radius: graphConst.GRAPH_CIRCLE_RADIUS
      }
    ],
    timer: 0
  }
};

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
