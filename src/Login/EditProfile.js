import React, { Component } from "react";
import { Redirect } from 'react-router';
import firebase from "../Firebase/FireBase.js";
import './CompleteRegistration.css'
import NavBar from "../NavBar/NavBar";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader


class EditProfile extends Component {
    constructor(props) {
        super(props);
        
        let end = false;
        this.state =  props.location.state.user;
     
        this.handleChange = this.handleChange.bind(this);
        this.SetUser = this.SetUser.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
    }

    SetUser(){
        firebase.database().ref('/Users/' + this.state.id).set(this.state);
        this.end = true;
        this.setState({});
      }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
      handleUploadError (error) {
        alert("Upload Error: " + error);
    };
    handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref("usersImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ img: url }));
    };

    render() {
        const divWidth = {
            maxWidth: '30%'
          };
          if(window.innerWidth < 500) // if it is phone set the width to 100%
              divWidth.maxWidth = '100%';
        return (
        <div>
        {this.end ? (<Redirect to="/" />):null}  
        <NavBar edit="edit"/>
        <hr/>
        <div className="completeReg" style ={divWidth}>
        <form>
        <h1>עריכת פרופיל</h1>
        <label>
        
        <div className="imguserc">
          <img className="user_e" src={this.state.img}/>
          <div className="useret">
              שנה תמונה
          </div> 
        </div>
          <FileUploader
            hidden
            accept="image/*"
            randomizeFilename
            storageRef={firebase.storage().ref("usersImg")}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
          </label>
          <br/>
        <label>
        :השם שלך
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
        </label>
        <label>
        :הפלאפון שלך
        <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}></input> 
        </label>
        <hr/>
        <input className="registerbtn" type="button" value="שמור" onClick={this.SetUser}/>
      </form>
        </div>
        </div>
        )
    }
}

export default EditProfile;