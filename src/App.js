import React, { Component } from "react";
import ManagePage from "./ManagePage/ManagePage";
import NavBar from "./NavBar/NavBar";
import NewClass from "./NewClass/NewClass";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AllCaterogy from './HomePage/AllCategory.js'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Router>
          <Route path="/NewClass" exact component={NewClass} />
          <Route path="/" render={() => { return <NavBar />;}}/>
          <Route path="/" exact render={() => { return (
          <div>
          <br></br>
          <AllCaterogy/>
          </div>
          );}}/>
          
        </Router>
    );
  }
}

export default App;
