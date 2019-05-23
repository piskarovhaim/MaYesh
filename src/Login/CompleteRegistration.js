import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import './CompleteRegistration.css'
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader


class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = props.user;
      
  this.handleChange = this.handleChange.bind(this);
  this.AddUser = this.AddUser.bind(this);
  this.handleUploadError = this.handleUploadError.bind(this);
  this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  AddUser(){
    firebase.database().ref('/Users/' + this.state.id).set(this.state);
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
        <div className="completeReg" style ={divWidth}>
        <form onSubmit={this.AddUser}>
        <h1>ברוכים הבאים למה יש</h1>
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
        <p onClick={this.AddUser}>דלג על שלב זה</p>
        <input className="registerbtn" type="submit" value="המשך" />
      </form>
        </div>
    );
  }
}

export default CompleteRegistration;
