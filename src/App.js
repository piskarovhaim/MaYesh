import React, { Component } from "react";
import HomePage from "./HomePage/HomePage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./Login/LogIn.js";
import EditProfile from "./Login/EditProfile.js";
import NewClass from "./NewClass/NewClass";
import Classs from "./Class/Class.js";
import Category from "./Category/Category.js";
import ManageCategory from "./Manage/ManageCategory.js";
import MainManagePage from "./Manage/MainManagePage.js";
import ManageClass from "./Manage/ManageClass.js";
import redirectTemp from "./Login/redirectTemp.js";
import Alert from "react-s-alert";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowH:window.innerHeight,
    };
    this.resizeHand = this.resizeHand.bind(this)
  }
resizeHand(){
  this.setState({})
}
componentWillUnmount(){
    window.removeEventListener("resize", this.resizeHand);
}
componentDidMount(){
    window.addEventListener("resize", this.resizeHand);
}
  render() {
    return (
      <div>
        <Alert stack={{ limit: 1 }} timeout={5000} html={true} position={'top-right'}/>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/NewClass" exact component={NewClass} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/Manage" exact component={MainManagePage} />
            <Route path="/RedirectTemp" exact component={redirectTemp} />

            <Route path="/editProfile/:id" exact component={EditProfile} />
            <Route
              path="/Manage/:name"
              exact
              render={({ match }) => {
                return <ManageCategory name={match.params.name} />;
              }}
            />
            <Route path="/Category/:name" exact component={Category} />
            <Route
              path="/Category/:nameC/Class/:nameClass"
              exact
              component={Classs}
            />
            <Route path="/ManageCategory" exact component={ManageCategory} />
            <Route
              path="/ManageClass/:catName/:className"
              exact
              render={({ match }) => {
                return (
                  <ManageClass
                    categoryName={match.params.catName}
                    className={match.params.className}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
