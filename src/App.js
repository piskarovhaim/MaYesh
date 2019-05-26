
import React, { Component } from "react";
import HomePage from './HomePage/HomePage.js'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";
import EditProfile from "./Login/EditProfile.js"
import NewClass from "./NewClass/NewClass";
import Classs from './Class/Class' ;
import Category from "./Category/Category.js";
import WebForm from './NewClass/WebForm.js'

class App extends Component {
  
  render() {
    return (
      <Router>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/NewClass" exact component={NewClass}/>
        <Route path="/login" exact component={LogIn}/>
        <Route path="/web" exact component={WebForm}/>
        <Route path="/editProfile/:id" exact component={EditProfile}/>
        <Route path="/Category/:name" exact render={({match}) => {return <Category name={match.params.name}/>;}}/>
        <Route path="/Category/:nameC/Class/:nameClass" exact render={({match}) => {return <Classs catname={match.params.nameC} classname={match.params.nameClass}/>;}}/>
       </Switch>
      </Router>
   );
  }
}

export default App;
