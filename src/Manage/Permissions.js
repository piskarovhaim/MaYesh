import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import { Redirect } from 'react-router';

class Permissions extends Component {
    
  constructor(props){
    super(props);
    this.state = { 
        getPermisiions:true,
        allowed:[
            't12qDCEN4LVVTDV4Z5qdw71SBGf1'
        ]
    };
  }

  componentWillMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      if(!user)
        this.setState({getPermisiions:false})
      else if(this.state.allowed.includes(user.uid))
        this.setState({getPermisiions:true})
      else
        this.setState({getPermisiions:false})
    })
  }

  render() {
    return (
        <div>
      {this.state.getPermisiions ? null:
        <div><Redirect to="/"/></div>}
        </div>)
  }
}

export default Permissions