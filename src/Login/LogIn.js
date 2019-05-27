import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import NavBar from "../NavBar/NavBar";
import { Redirect } from 'react-router';
import CompleteRegistration from './CompleteRegistration.js';
import './FormStyle.css'

class LogIn extends Component {
    
  constructor(){
    super();
    this.state = { isSignedIn: false,newUser:true,loading : true , categoryList:[]};
  }

  uiConfig = {
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
    
}
  componentDidMount = () => {

      let categories = [];
      let ref = firebase.database().ref('/CategoryList');
      ref.on('value', snapshot => {
        snapshot.forEach(child => {
              categories.push(child.val());
          });
            this.setState({categoryList:categories});
      });

    firebase.auth().onAuthStateChanged(user => {

      this.setState({ isSignedIn: !!user})
      if(!user)
        return;
      let tempPhone = user.phoneNumber
      ref = firebase.database().ref('/Users');
      ref.on('value', snapshot => {
        snapshot.forEach(child => {
            console.log(child.key)
            if(user.uid === child.key)
                this.setState({newUser:false,loading:false});
          });
          if(tempPhone == null)
            tempPhone = "";
          if(user)
            this.setState({loading:false,user:{id:user.uid,email:user.email,name:user.displayName,phone:tempPhone,img:user.photoURL,favoriteCat:"",listOfSignInClass:""}});
      });
    })
  }
  render() {
    let signin =false;
    let notRegistered = false;
    let endProcess = false;
    if(this.state.newUser && this.state.isSignedIn && !this.state.loading)
        notRegistered = true;
    if(!this.state.newUser && this.state.isSignedIn)
        endProcess = true;
    if(!this.state.isSignedIn)
      signin =true;
    return (
      <div className="login">
          <NavBar login={!endProcess}/>
          <hr/>
          {signin ? (
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          ):null}
          {notRegistered ? (
           <CompleteRegistration user={this.state.user} categoryList={this.state.categoryList}/>
          ):null}
          {endProcess ? (
            <Redirect to="/" />
          ):null}
      
      </div>
    )
  }
}

export default LogIn