import "./App.css";
import AppContainer from './containers/appContainer';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions/actionCreators';

function mapStateToProps(state) {
  return {
    graph: state.graph
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);

export default App;