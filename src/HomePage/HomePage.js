import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllCaterogy from './AllCategory.js'
import './HomePage.css'
import Video from './Video.js'

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
          <Router primary={false}>
          
          <Route path="/" render={() => { return <NavBar />;}}/>
          <Route path="/" render={() => { return (
            <div>
            <Video/>
          <AllCaterogy/>
          </div>
          );}}/>
        </Router>
     </div>
    );
  }
}

export default HomePage;
