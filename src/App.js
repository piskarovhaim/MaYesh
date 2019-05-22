import React, { Component } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 64e629a6652fcb501baacc7fb2151b7a58e57e01
import HomePage from './HomePage/HomePage.js'
import NewClass from "./NewClass/NewClass.js";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";


import EditProfile from "./Login/EditProfile.js"
<<<<<<< HEAD
=======
import ManagePage from "./ManagePage/ManagePage";
import NavBar from "./NavBar/NavBar";
import NewClass from "./NewClass/NewClass";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AllCaterogy from './HomePage/AllCategory.js';
import Classs from './Class/Class' ;
>>>>>>> israel
=======
import Category from "./Category/Category.js";
>>>>>>> 64e629a6652fcb501baacc7fb2151b7a58e57e01

class App extends Component {
  
  render() {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 64e629a6652fcb501baacc7fb2151b7a58e57e01
      <Router>
        <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/NewClass" exact component={NewClass}/>
        <Route path="/login" exact component={LogIn}/>
        <Route path="/EditProfile" exact component={EditProfile}/>
        <Route path="/Category/:name" exact render={({match}) => {return <Category name={match.params.name}/>;}}/>
        <Route path="/Category/:nameC/Class/:nameClass" exact render={({match}) => {return <Category catname={match.params.nameC} classname={match.params.nameClass}/>;}}/>
        </Switch>
      </Router>
=======
        <Router>
          <Route path="/Class" exact component={Classs} />
          <Route path="/NewClass" exact component={NewClass} />
          <Route path="/" render={() => { return <NavBar />;}}/>
          <Route path="/" exact render={() => { return (
          <div>
          <br></br>
          <AllCaterogy/>
          </div>
          );}}/>
          
        </Router>
>>>>>>> israel
    );
  }
}

export default App;
