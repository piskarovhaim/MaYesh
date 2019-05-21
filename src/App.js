import React, { Component } from "react";
import HomePage from './HomePage/HomePage.js'
import NewClass from "./NewClass/NewClass.js";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";
import Test from './HomePage/test.js'
import EditProfile from "./Login/EditProfile.js"

class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/NewClass" exact component={NewClass}/>
        <Route path="/login" exact component={LogIn}/>
        <Route path="/EditProfile" exact component={EditProfile}/>
        <Route path="/Category/:name" exact render={({match}) => {return <Test name={match.params.name}/>;}}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
