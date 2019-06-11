import React, { Component } from "react";
import Search from "./Search.js";
import firebase from "../Firebase/FireBase.js";
import "./NavBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './logoN.png'

class NavBar extends Component {
  constructor(props) {
    super(props);

    let location = "/";
    if (props.location != undefined) location = props.location;
    this.state = {
      isSignedInProsses: props.login,
      edit: props.edit,
      isSignedIn: false,
      location: props.location,
      navStyle: {
        height: window.innerHeight / 10
      },
      user: {
        id: "",
        email: "",
        name: "",
        phone: "",
        img: "",
        favoriteCat: "",
        listOfSignInClass: ""
      }
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      if (!user) return;
      let currentUser;
      let tempPhone = user.phoneNumber;
      if (tempPhone == null) tempPhone = "";
      this.setState({
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          phone: tempPhone,
          img: user.photoURL,
          favoriteCat: "",
          listOfSignInClass: ""
        }
      });
      let ref = firebase.database().ref("/Users");
      ref.on("value", snapshot => {
        snapshot.forEach(child => {
          if (user.uid === child.key) {
            currentUser = child.val();
            this.setState({
              user: {
                id: currentUser.id,
                email: currentUser.email,
                name: currentUser.name,
                phone: currentUser.phone,
                img: currentUser.img,
                favoriteCat: currentUser.favoriteCat,
                listOfSignInClass: currentUser.favoriteCat
              }
            });
            return;
          }
        });
      });
    });
  };
  render() {
    const setNavHeight = {
      height: this.state.navStyle.height
    };

    var nav = document.querySelector('#navBar');
    window.onscroll = function(){
      if(window.pageYOffset<100){
         nav.className='nav';
      } else {
        nav.className='navScroll';
      }

    }
    let login = this.state.isSignedIn;
    let edit = false;
    if (this.state.isSignedInProsses) login = false;
    if (this.state.edit) edit = true;

    return (
      <div className="nav" id="navBar">
        <div className="navLeft">
            {login ? (
              <div className="inline">
                <img className="user" src={this.state.user.img} />
                {edit ? null : (
                  <div className="dropDown">
                    <Link
                      to={{
                        pathname: "/editProfile/" + this.state.user.id,
                        state: { user: this.state.user }
                      }}
                    >
                      <div className="edit">
                        <div className="navTextMenu">עריכת פרופיל</div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div
                        className="navTextMenu"
                        onClick={() => firebase.auth().signOut()}
                      >
                        יציאה
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={{
                  pathname: "/Login",
                  state: { location: this.state.location, title: "התחבר עם" }
                }}
              >
                <div className="loginText">
                  <div className="navTextMenu">התחבר</div>
                </div>
              </Link>
            )}
             <a href="#" className="navText">אודות</a>
        </div>
        <div className="navRight">
            <Search/>
            <Link to="/">
            <img src={logo} 
            className="logoBox" alt="logo"/>
            </Link>
           
        </div>
      </div>
    );
  }
}

export default NavBar;
