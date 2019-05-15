import React, { Component } from "react";
import ManagePage from "../ManagePage/ManagePage";
import NavBar from "../NavBar/NavBar";
import NewClass from "../NewClass/NewClass";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AllCaterogy from './AllCategory.js'
import Video from './Video.js'
import './HomePage.css'
import { ParallaxProvider } from 'react-scroll-parallax';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ParallaxProvider y={[-20, 20]} tagOuter="figure">
        <Router primary={false}>
          
          <Route path="/NewClass" exact component={NewClass} />
          <Route path="/" render={() => { return <NavBar />;}}/>
          <Route path="/" render={() => { return (
           <div className="scroll">
            <Video/>
          <AllCaterogy/>
          </div>
          );}}/>
          
        </Router>
        </ParallaxProvider>
    );
  }
}

export default HomePage;
