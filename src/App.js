import React, { Component } from "react";
<<<<<<< HEAD
import ManagePage from "./ManagePage/ManagePage";
import NavBar from "./NavBar/NavBar";
import NewClass from "./NewClass/NewClass";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AllCaterogy from './HomePage/AllCategory.js'
import Category from './Category/Category.js'
=======
import HomePage from './HomePage/HomePage.js'
import NewClass from "./NewClass/NewClass.js";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";
import Test from './HomePage/test.js'
import EditProfile from "./Login/EditProfile.js"
>>>>>>> 715c0b4e636a8727a21755f6c293c08543f7d3e4

class App extends Component {
  
  render() {
    return (
<<<<<<< HEAD
        <Router>
          <Route path="/sport" exact component={Category}/>
          <Route path="/NewClass" exact component={NewClass} />
          <Route path="/" render={() => { return <NavBar />;}}/>
          <Route path="/" exact render={() => { return (
          <div>
          <br></br>
          <AllCaterogy/>
          </div>
          );}}/>
          
        </Router>
=======
      <Router>
        <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/NewClass" exact component={NewClass}/>
        <Route path="/login" exact component={LogIn}/>
        <Route path="/EditProfile" exact component={EditProfile}/>
        <Route path="/Category/:name" exact render={({match}) => {return <Test name={match.params.name}/>;}}/>
        </Switch>
      </Router>
>>>>>>> 715c0b4e636a8727a21755f6c293c08543f7d3e4
    );
  }
}

export default App;
