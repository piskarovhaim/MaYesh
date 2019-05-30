import React, { Component } from "react";
import MobileForm from "./MobileForm";
import WebForm from "./WebForm.js"
import { Redirect } from "react-router";

class NewClass extends Component {

  constructor(props){
    super(props);
    let isLogin =false;
    let user ={};
    if(this.props.location.state !== undefined && this.props.location.state.isLogin){
        isLogin = true;
        user = this.props.location.state.user;
        console.log(user);
    }

    this.state={
      isLogin:isLogin,
      user:user,
    }
  }

  render(){

    let web = true;
    if(window.innerWidth < 500)
      web = false;
    return(
      <div>
      {this.state.isLogin ? null:<Redirect to={{pathname: "/Login", state:{location:"/NewClass",title:"חובה להתחבר לפני רישום חוג חדש"}}}/>}
      {web ? <WebForm user={this.state.user}/> : <MobileForm user={this.state.user}/>}
      </div>
    )
  }

}

export default NewClass;