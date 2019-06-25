import React, { Component } from "react";
import Search from "./Search.js";
import firebase from "../Firebase/FireBase.js";
import "./NavBar.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './logoN.png'
import AnchorLink from 'react-anchor-link-smooth-scroll'

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
        height: window.innerHeight / 10,
      },
      pageYOffset : 0,
      showNav:false,
      windowH:window.innerHeight,
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
    this.listenToScroll = this.listenToScroll.bind(this)
    this.updateWindows = this.updateWindows.bind(this)
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWindows);
    window.removeEventListener('scroll', this.listenToScroll);
  }
  updateWindows(){
    this.setState({windowH:window.innerHeight})
  }

  listenToScroll(){
    if(window.pageYOffset < this.state.pageYOffset)
      this.setState({pageYOffset:window.pageYOffset,showNav:true})
    else
      this.setState({pageYOffset:window.pageYOffset,showNav:false})
  }


  componentDidMount = () => {
    window.addEventListener('scroll', this.listenToScroll);
    window.addEventListener("resize", this.updateWindows);
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

    let login = this.state.isSignedIn;
    let edit = false;
    if (this.state.isSignedInProsses) login = false;
    if (this.state.edit) edit = true;
    let navH = {height: (this.state.windowH/10)}
    let classNav = 'nav'
    if(this.props.homePage){
      classNav = 'navScroll';  
      navH.display='none';
    }
    if(this.props.homePage && this.state.pageYOffset > (this.state.windowH/10) && this.state.showNav){
      classNav = 'navScroll';  
      navH.display='flex';
    }
    let about = false;
    if(this.props.about && window.innerWidth > 500)
        about =true;
    
    return (
      <div className="navtest" >
      <div className={classNav} style={navH}>
      <div className="navLeft">
      {login ? (
          <div className="inline">
            <img className="user" src={this.state.user.img}  />
            {edit ? null : (
              <div className="dropDown">
                <Link className="linkto"
                  to={{
                    pathname: "/editProfile/" + this.state.user.id,
                    state: { user: this.state.user, categoryList:this.state.categoryList }
                  }}
                >
                  <div className="edit">
                      <div className="navTextMenu">עריכת פרופיל</div>
                  </div>
                </Link>
                <Link to={{pathname: this.state.location, state:{isLogin:false}}} className="linkto"><div className="edit">
                  <div
                    className="navTextMenu"
                    onClick={() => firebase.auth().signOut()}>
                    יציאה
                    </div> </div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link className="linkto"
            to={{
              pathname: "/Login",
              state: { location: this.state.location, title: "התחבר עם" }
            }}
          >
                <div className="navTextMenu">התחבר</div>
          </Link>
        )}
        {about?
        <AnchorLink href='#About'>
            <div className="navTextAbout">אודות</div>
        </AnchorLink>
        :
        null}
      </div>
      <div className="navRight">
      <Search/>
        <Link to="/">
          <img className="logoBox" alt="logo" src={logo}/>
        </Link>
        
        </div>
      </div>
      </div>
    );
  }
}

export default NavBar;
