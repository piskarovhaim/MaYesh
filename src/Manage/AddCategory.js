import React, { Component } from 'react';
import firebase from '../Firebase/FireBase.js';
import '../Login/FormStyle.css'
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader


class AddCategory extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            classList:[],
            img: "",
            desc: "",
            likesCounter: 0
        };

        this.AddCategory = this.AddCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this)
    }
    AddCategory() {
        firebase.database().ref('/CategoryList/' + this.state.name).set(this.state);
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
      handleUploadError (error) {
        alert("Upload Error: " + error);
    };
    handleUploadSuccess(filename) {
    alert("התמונה נשמרה בהצלחה")
    firebase
      .storage()
      .ref("usersImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ img: url }));
    };

      render(){
        let style={margin:15,float:'right',borderLeft:'1px solid black'};
        if(window.innerWidth < 500)
            style.width = '100%';
        return (
        <div className="completeReg" style={style}>
        <form onSubmit={this.AddCategory}>
        <b>
        :הוספת קטגוריה חדשה
       </b>
       <br/><br/>  
        <label>
        שם
        <input type="text" required name="name" onChange={this.handleChange} />
        </label>
        <label>תמונה</label>
        <FileUploader
            accept="image/*"
            randomizeFilename
            storageRef={firebase.storage().ref("usersImg")}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
          />
        <label>
        תיאור
        <input type="text" name="desc" onChange={this.handleChange} />
        </label>
        <input className="registerbtn" type="submit" value="שמור" />
       </form>
       </div>
        );
      };
      
}

export default AddCategory;