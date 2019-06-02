import React, { Component } from "react";
import Search from "./Search.js";
import firebase from "../Firebase/FireBase.js";
import "./NavBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    let location = window.location.pathname
    if(location == "/Login")
        location = "/"
    this.state = {
      isSignedInProsses: props.login,
      edit: props.edit,
      isSignedIn: false,
      location: location,
      navStyle: {
        height: window.innerHeight / 10
      },
      categoryList:[],
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

    let ref = firebase.database().ref('/CategoryList');
    ref.on('value', snapshot => {
      let categories = [];
      snapshot.forEach(child => {
            categories.push(child.val());
        });
          this.setState({categoryList:categories});
    });

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
                listOfSignInClass: currentUser.listOfSignInClass
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

    let login = this.state.isSignedIn;
    let edit = false;
    if (this.state.isSignedInProsses) login = false;
    if (this.state.edit) edit = true;
    
    return (
      <div className="nav" style={setNavHeight}>
        <Link to="/">
          <img
            className="logo"
            src="https://firebasestorage.googleapis.com/v0/b/mayesh-bd07f.appspot.com/o/imgs%2Flogo.jpg?alt=media&token=cae07f5d-0006-42c8-8c16-c557c1ea176c"
          />
        </Link>
        {login ? (
          <div className="inline">
            <img className="user" src={this.state.user.img} />
            {edit ? null : (
              <div className="dropDown">
                <Link className="linkto"
                  to={{
                    pathname: "/editProfile/" + this.state.user.id,
                    state: { user: this.state.user, categoryList:this.state.categoryList }
                  }}
                >
                  <div className="edit">
                    <div className="navText">עריכת פרופיל</div>
                  </div>
                </Link>
                <Link to={{pathname: this.state.location, state:{isLogin:false}}} className="linkto"><div className="edit">
                  <div
                    className="navText"
                    onClick={() => firebase.auth().signOut()}>
                    יציאה
                    </div> </div>
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
              <div className="navText">התחבר</div>
            </div>
          </Link>
        )}
        <Search />
      </div>
    );
  }
}

export default NavBar;
