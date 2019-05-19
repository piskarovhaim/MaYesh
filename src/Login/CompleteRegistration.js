import React, { Component } from "react";
import { Redirect } from 'react-router';
import firebase from "../Firebase/FireBase.js";
import './CompleteRegistration.css'


class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        id:"",email:"",name:"",phone:"",img:"",favoriteCat:"",listOfSignInClass:""
    };
      
  this.handleChange = this.handleChange.bind(this);
  this.AddUser = this.AddUser.bind(this);
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({id:user.uid,email:user.email,name:user.displayName,phone:user.phoneNumber,img:user.photoURL,favoriteCat:"",listOfSignInClass:""});
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  AddUser(){
    console.log(this.state.user);
    firebase.database().ref('/Users/' + this.state.id).set(this.state);
    return(<Redirect to="/" />);
  }

  render() {
    const divWidth = {
      maxWidth: '30%'
    };
    if(window.innerWidth < 500) // if it is phone set the width to 100%
        divWidth.maxWidth = '100%';
   
    return (
        <div className="completeReg" style ={divWidth}>
        <form onSubmit={this.AddUser}>
        <h1>ברוכים הבאים למה יש</h1>
        {//<img src={this.state.img} />
        }
        <label>
        ?השם שלך
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
          
        </label>
        <label>
        ?הפלאפון שלך
        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}></input>
       
        </label>
        <br/>
        בחר את הקטגויות המועדפות שלך
        <br/>
        <input type="checkbox" name="o1" value="food"/>אוכל<br/>
        <input type="checkbox" name="o2" value="sport"/>ספורט<br/>
        <input type="checkbox" name="03" value="yuga"/> יוגה<br/>
        <hr/>
        <input className="registerbtn" type="submit" value="המשך" />
      </form>
        </div>
    );
  }
}

export default CompleteRegistration;
