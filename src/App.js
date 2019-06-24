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
  render() {
    return (
      <div>
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
        <Alert stack={{ limit: 1 }} />
      </div>
    );
  }
}

export default App;
