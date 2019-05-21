import React, { Component } from "react";
import { Redirect } from 'react-router';
import firebase from "../Firebase/FireBase.js";
import './CompleteRegistration.css'
import NavBar from "../NavBar/NavBar";


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id:props.id,
            name:props.name,
            phone:props.phone,
            img:props.img,
        };
        this.handleChange = this.handleChange.bind(this);
        this.SetUser = this.SetUser.bind(this);
    }

    componentDidMount() {

    }
    SetUser(){
        firebase.database().ref('/Users/' + this.state.id).set(this.state);
        return(<Redirect to="/" />);
      }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }

    render() {
        const divWidth = {
            maxWidth: '30%'
          };
          if(window.innerWidth < 500) // if it is phone set the width to 100%
              divWidth.maxWidth = '100%';
         
        return (
        <div>        
        <NavBar />
        <hr/>
        <div className="completeReg" style ={divWidth}>
        <form onSubmit={this.SetUser}>
        <h1>עריכת פרופיל</h1>
        {//<img src={this.state.img} />
        }
        <label>
        :השם שלך
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
        </label>
        <label>
        :הפלאפון שלך
        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}></input> 
        </label>
        <hr/>
        <input className="registerbtn" type="submit" value="שמור" />
      </form>
        </div>
        </div>
        )
    }
}

export default EditProfile;