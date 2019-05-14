import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LogIn from "../Firebase/LogIn.js";
import firebase from "../Firebase/FireBase.js";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import {
  IonSearchbar,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons
} from "@ionic/react";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignedIn: false };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };
  render() {
    return (
      <div>

        <Route path="/login" exact="true" render={() => {return <LogIn />;}}/>
        <Route path="/" exact="true" render={() => {return (
              <div className="nav">
                  {this.state.isSignedIn ? (
                    <div className="inline">
                      <button onClick={() => firebase.auth().signOut()}>התנתק</button>
                      <img className="user" src={firebase.auth().currentUser.photoURL}/>
                      </div>
                  ) : (                    
                    <Link to="/login" exact="true" target="_blank" onClick={() => window.open("/login", "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=300, height=400, top=30")}>
                      כניסת משתמשים
                    </Link>
                  )}
                    <button onClick={()=>alert("serch")}>חפש</button>
                    <input type="text" />
                    <div className="inline" > ?מה יש</div>
                    

                </div>
              
            );
          }}
        />
      </div>
    );
  }
}

export default NavBar;
