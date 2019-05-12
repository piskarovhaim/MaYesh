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
import NewClass from "../NewClass/NewClass.js";

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
        <Route
          path="/login"
          exact="true"
          render={() => {
            return <LogIn />;
          }}
        />

        <Route
          path="/"
          exact="true"
          render={() => {
            return (
              <IonToolbar color="dark">
                <IonButtons slot="secondary">
                  {this.state.isSignedIn ? (
                    <span>
                      <div>Signed In!</div>
                      <button onClick={() => firebase.auth().signOut()}>
                        Sign out!
                      </button>
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      exact="true"
                      target="_blank"
                      onClick={() =>
                        window.open(
                          "/login",
                          "Popup",
                          "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=300, height=400, top=30"
                        )
                      }
                    >
                      <IonButton>
                        <IonIcon slot="icon-only" name="contact" />
                      </IonButton>
                    </Link>
                  )}

                  <IonButton>
                    <IonIcon slot="icon-only" name="search" />
                  </IonButton>
                  <div>
                    <input type="text" />
                    <t />
                    ?מה יש
                  </div>
                </IonButtons>
              </IonToolbar>
            );
          }}
        />
      </div>
    );
  }
}

export default NavBar;
