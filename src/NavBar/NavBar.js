import React, { Component } from "react";
import Search from './Search.js'
import firebase from "../Firebase/FireBase.js";
import "./NavBar.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./NavBar.css"

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isSignedInProsses:props.login,
      isSignedIn: false,
      navStyle:{
            height: (window.innerHeight/10)
        }
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };
  render() {
    const setNavHeight = {
      height: this.state.navStyle.height
    }
    let login = this.state.isSignedIn;
    if(this.state.isSignedInProsses)
      login =false;
    return (
              <div className="nav" style={setNavHeight}>
                  <img className="logo" src="https://firebasestorage.googleapis.com/v0/b/mayesh-bd07f.appspot.com/o/imgs%2Flogo.jpg?alt=media&token=cae07f5d-0006-42c8-8c16-c557c1ea176c"/>
                  {login ? (
                    <div className="inline">
                      <img className="user" src={firebase.auth().currentUser.photoURL}/>
                      <div className="dropDown">
                        <p className="navText">עריכת פרופיל</p>
                        <p className="navText" onClick={() => firebase.auth().signOut()}>יציאה</p>
                      </div>
                    </div>
                  ) : (                    
                    <Link to="/login">
                    <div className="loginText"><p className="navText">התחבר</p></div>
                    </Link>
                  )}
                <Search/>
                </div>              
    );
  }
}

export default NavBar;
