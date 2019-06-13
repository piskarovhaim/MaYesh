import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import NavBar from "../NavBar/NavBar";
import { Redirect } from 'react-router';
import CompleteRegistration from './CompleteRegistration.js';
import './FormStyle.css'

class LogIn extends Component {
    
  constructor(props){
    super(props);
    this.state = { 
      isSignedIn: false,
      newUser:true,
      loading : true ,
      title: props.location.state.title,
      categoryList:[],
      location: props.location.state.location,
      user:{
        id:"",
        email:"",
        name:"",
        phone:"",
        img:"",
        favoriteCat:[],
        listOfSignInClass:""
      }
    };
    this.AddUser = this.AddUser.bind(this);
  }

  uiConfig = {
    signInFlow: 'popup',
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
        let currentUser;
        let tempPhone = user.phoneNumber;
        if(tempPhone == null)
          tempPhone =""
        this.setState({user:{id:user.uid,email:user.email,name:user.displayName,phone:tempPhone,img:user.photoURL,favoriteCat:[],listOfSignInClass:""}});
        let ref = firebase.database().ref('/Users');
        ref.on('value', snapshot => {
          snapshot.forEach(child => {
              if(user.uid === child.key){
                currentUser = child.val();
                this.setState({newUser:false,loading:false,user:{id:currentUser.id,email:currentUser.email,name:currentUser.name,phone:currentUser.phone,img:currentUser.img,favoriteCat:currentUser.favoriteCat,listOfSignInClass:currentUser.favoriteCat}});
                return;
              }
            }); 
            this.setState({newUser:true,loading:false })        
        });
    })
  }

  AddUser(){
    firebase.database().ref('/Users/' + this.state.id).set(this.state);
    this.AddUser.endProses =true;
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
          <div>
            <h3>{this.state.title}</h3>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
          ):null}
          {notRegistered ? (
           <CompleteRegistration user={this.state.user} categoryList={this.state.categoryList} location={this.state.location}/>
          ):null}
          {endProcess ? (
            <Redirect to={{pathname: this.state.location, state:{isLogin:true,user:this.state.user}}}/>
          ):null}
      
      </div>
    )
  }
}

export default LogIn