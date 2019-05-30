import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import './FormStyle.css'
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import { Redirect } from 'react-router';

function FavoritesCategeory(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;
  console.log(categories);
  
  return (
      <div className="BigfavoritesCat">
        {categories.map((object, i) => {
          let strID = "ch" + i;
          return (
              <div key={i} className="favoritesCat">
              <input type="checkbox" id={strID} />
            <label htmlFor={strID}><img src={object.img} />
            </label>
            </div>
            );
          })}
      </div>
  );
}

class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = props.user;
    let endProses =false;
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
    this.endProses =true;
    this.setState({});
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
      maxWidth: '35%'
    };
    if(window.innerWidth < 500) // if it is phone set the width to 100%
        divWidth.maxWidth = '100%';
    return (
        <div className="completeReg" style ={divWidth}>
        <form>
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

        <label>
        בחר קטגוריות מעדפות
        <FavoritesCategeory value={this.state.category} func={this.handleChange} categories={this.props.categoryList}/>
        </label>
        <br></br>
        <hr/>
        <p onClick={this.AddUser}>דלג על שלב זה</p>
        <input className="registerbtn" type="button" value="המשך" onClick={this.AddUser}/>
      </form>
      {this.endProses  ? (
            <Redirect to={{pathname: this.props.location, state:{isLogin:true,user:this.state.user}}}/>
          ):null}
        </div>
    );
  }
}

export default CompleteRegistration;
