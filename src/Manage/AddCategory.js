/*
--ADD CATEGORY COMPONENT--
 component objective: get value for img url, name, and description and store new category into the DB
*/

import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./AddCategory.css";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      classList: [],
      img: "",
      desc: "",
      likesCounter: 0,
      progress: []
    };

    this.AddCategory = this.AddCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }
  //set the new path in the  DB
  AddCategory() {
    firebase
      .database()
      .ref("/CategoryList/" + this.state.name)
      .set(this.state);
  }
  //set the new value state
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //upload image func
  handleProgress = progress => this.setState({ progress: progress + "%" });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  //upload image func - store the new image to the DB
  handleUploadSuccess(filename) {
    alert("התמונה נשמרה בהצלחה");
    firebase
      .storage()
      .ref("categoryImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ img: url, progress: [] }));
  }

  render() {
    let style =  {};
    if (window.innerWidth < 500) {
      //case phone display
      style.width = "80%";
      style.border = "none";
    }
    return (
      <div className="addCategory" style={style}>
        <form onSubmit={this.AddCategory}>
          <b>:הוספת קטגוריה חדשה</b>
          <br />
          <br />
          <label>
            שם
            <input
              type="text"
              required
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <label>תמונה {this.state.progress}</label>
          <FileUploader
            accept="image/*"
            randomizeFilename
            storageRef={firebase.storage().ref("categoryImg")}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <label>
            תיאור
            <br/>
            <textarea name="desc" onChange={this.handleChange} />
          </label>
          <input className="registerbtn" type="submit" value="שמור" />
        </form>
      </div>
    );
  }
}

export default AddCategory;
