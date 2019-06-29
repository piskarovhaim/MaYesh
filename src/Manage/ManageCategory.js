/*
--MANAGE CATEGORY COMPONENT-- 
include:
-nav bar of the category (not confirmed classes, old classes,all classes,main page redirect)
-edit category form 
-display all the courses of the category 

*/
import logo from '../NavBar/logoN.png'
import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./ManageCategory.css";
import "./AddCategory.css";
import AllCourses from "./AllCourses.js";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import "./ManageClass.css";
import Permissions from "./Permissions";
import { Redirect } from "react-router";

import { BrowserRouter as Router, Link } from "react-router-dom";

class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: props.name,
      img: "",
      desc: "",
      classList: [],
      waitToConfirmedClass: [],
      ConfirmedClass: [],
      oldClass: [],
      showType: "all"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategoryInClassList = this.updateCategoryInClassList.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }
  //update the new category in each course
  updateCategoryInClassList() {
    let arr = this.state.classList;
    Object.values(arr).map(obj => {
      obj.category = this.state.categoryName;
    });
    this.setState({ classList: arr });
  }
  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/CategoryList/" + this.state.categoryName);

    ref.once("value", snapshot => {
      let arr = [];
      let arrTempWaitClasses = [];
      let arrTempOldClasses = [];
      let arrTempConfirmedClasses = [];
      let time = new Date(Date.now());
      if (snapshot.val().classList != undefined) {
        Object.keys(snapshot.val().classList).forEach(function(key) {
          let temp = snapshot.val().classList;
          arr[snapshot.val().classList[key].name] = temp[key];

          let classTime = new Date(temp[key].date);
          if (time > classTime || isNaN(classTime))
            arrTempOldClasses.push(temp[key]);
          else if (!temp[key].isConfirmed) arrTempWaitClasses.push(temp[key]);
          else arrTempConfirmedClasses.push(temp[key]);
        });

        this.setState({
          categoryName: snapshot.val().name,
          img: snapshot.val().img,
          desc: snapshot.val().desc,
          classList: arr,
          waitToConfirmedClass: arrTempWaitClasses,
          ConfirmedClass: arrTempConfirmedClasses,
          oldClass: arrTempOldClasses
        });
      } else {
        this.setState({
          categoryName: snapshot.val().name,
          img: snapshot.val().img,
          desc: snapshot.val().desc,
          classList: []
        });
      }
    });
  }
  async handleSubmit() {
    if (window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?") == false) {
      return;
    }

    await this.updateCategoryInClassList();

    let ref = firebase.database().ref("/CategoryList/" + this.props.name);
    ref.remove();
    ref = firebase.database().ref("/CategoryList/" + this.state.categoryName);
    ref.set({
      classList: this.state.classList,
      desc: this.state.desc,
      img: this.state.img,
      name: this.state.categoryName
    });

    this.endOfProcess = true;
    this.setState({});
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleProgress = progress => this.setState({ progress: progress + "%" });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref("categoryImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ img: url, progress: [] }));
  }
  render() {
    let style = {};
    if (window.innerWidth < 500) {
      style.width = "80%";
      style.border = "none";
    }
    let classList = this.state.classList;
    switch (this.state.showType) {
      case "wait":
        classList = this.state.waitToConfirmedClass;
        break;
      case "old":
        classList = this.state.oldClass;
        break;
      case "confirmed":
        classList = this.state.ConfirmedClass;
        break;
      default:
        classList = this.state.classList;
    }
    return (
      <div>
        <Permissions />
        {this.endOfProcess ? <Redirect to="/manage" /> : null}
        <div className="managenav">
          <Link to="/">
          <img
              className="logo"
              alt="logo" src={logo}/>
          </Link>
          <div className="managenavbarinline">
            <Link to="/manage">
              {" "}
              <div className="managenavText">דף ניהול ראשי</div>
            </Link>
            <div
              className="managenavText"
              onClick={() => this.setState({ showType: "all" })}
            >
              הכל
            </div>
            <div
              className="managenavText"
              onClick={() => this.setState({ showType: "confirmed" })}
            >
              מאושרים
            </div>
            <div
              className="managenavText"
              onClick={() => this.setState({ showType: "wait" })}
            >
              לא מאושרים
            </div>
            <div
              className="managenavText"
              onClick={() => this.setState({ showType: "old" })}
            >
              ישנים
            </div>
          </div>
        </div>
        <hr />
        <div className="mainManageDiv">
        <div className="addCategory" style={style}>
          <b>עריכת קטגורית </b>
          <b>{this.state.categoryName}</b>
          <br /> <br />
          <form>
            <label>
              שם הקטגוריה
              <input
                type="text"
                name="categoryName"
                value={this.state.categoryName}
                onChange={this.handleChange}
              />
            </label>
            <label>
              תיאור
              <textarea
                name="desc"
                value={this.state.desc}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <div className="imgclassManagec">
                <img className="class_e" src={this.state.img} />
                <div className="classet">{this.state.progress}שנה תמונה</div>
              </div>
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage().ref("categoryImg")}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
            <label>
              <input
                className="registerbtn"
                type="button"
                value="שמור"
                onClick={this.handleSubmit}
              />
            </label>
          </form>
        </div>
        <AllCourses list={classList} categoryName={this.state.categoryName} />
        </div>
      </div>
    );
  }
}
export default ManageCategory;
