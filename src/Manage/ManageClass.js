import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import NavBar from "../NavBar/NavBar";
import "../Login/FormStyle.css";
import { Redirect } from "react-router";
import Permissions from "./Permissions";

import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader

import "./ManageClass.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function ShowPartici(props) {
  let particiList = [];
  let particiListKey = [];

  if (props.particiList !== null && props.particiList !== undefined) {
    particiList = Object.values(props.particiList);
    particiListKey = Object.keys(props.particiList);
  }
  return (
    <div>
      <h3>רשימת משתתפים בחוג</h3>
      {particiList.map((participant, i) => {
        return (
          <div key={i}>
            <div>
              <div className="participantmanage" key={participant.id}>
                <span>
                  <img className="partimgmanage" src={participant.img} />
                </span>
                <div>{participant.name}</div>
                <div
                  className="delPartici"
                  onClick={() => props.removePartici(particiListKey[i])}
                >
                  הסר משתתף{" "}
                </div>
              </div>
              <hr />
            </div>
          </div>
        );
      })}
    </div>
  );
}

class ManageClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.className,
      category: props.categoryName,
      organizer: "",
      organizerId: "",
      phoneNumber: "",
      location: "",
      minPartici: "",
      maxPartici: "",
      date: "",
      numOfCurrPartici: "",
      hour: "",
      description: "",
      imgUrl: "",

      particiList: [],
      progress: [],
      isConfirmed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.removePartici = this.removePartici.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentDidMount() {
    let ref = firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.props.categoryName +
          "/classList/" +
          this.props.className
      );
    ref.on("value", snapshot => {
      let tempState = snapshot.val();
      if (
        tempState !== null &&
        tempState !== undefined &&
        tempState.numOfCurrPartici < 1
      )
        tempState.particiList = [];
      if (tempState !== null && tempState !== undefined) {
        tempState.date = this.formatDate(tempState.date);
        if (new Date(tempState.hour) != "Invalid Date")
          tempState.hour = new Date(tempState.hour).toLocaleTimeString();
      }
      this.setState(tempState);
    });
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async handleSubmit() {
    if (window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?") == false) {
      return;
    }
    let ref = firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.props.categoryName +
          "/classList/" +
          this.props.className
      );

    ref.remove();
    ref = firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.props.categoryName +
          "/classList/" +
          this.state.name
      );
    ref.set(this.state);
    this.endOfProcess = true;
    this.setState({});
  }

  handleProgress = progress => this.setState({ progress: progress + "%" });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref("classImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imgUrl: url, progress: [] }));
  }

  removePartici(particiKey) {
    firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.state.category +
          "/classList/" +
          this.state.name +
          "/particiList/" +
          particiKey
      )
      .remove();
    firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.state.category +
          "/classList/" +
          this.state.name +
          "/numOfCurrPartici"
      )
      .set(this.state.numOfCurrPartici - 1);
  }

  render() {
    const divWidth = {
      maxWidth: "30%"
    };

    const setNavHeight = {
      height: window.innerHeight / 10
    };
    if (window.innerWidth < 500)
      // if it is phone set the width to 100%
      divWidth.maxWidth = "100%";

    return (
      <div>
        <Permissions />
        <div className="managenav" style={setNavHeight}>
          <Link to="/">
            <img
              className="logo"
              src="https://firebasestorage.googleapis.com/v0/b/mayesh-bd07f.appspot.com/o/imgs%2Flogo.jpg?alt=media&token=cae07f5d-0006-42c8-8c16-c557c1ea176c"
            />
          </Link>
          <div className="managenavbarinline">
            <Link to="/manage">
              {" "}
              <div className="managenavText">דף ניהול ראשי</div>
            </Link>
          </div>
        </div>
        <hr />

        {this.endOfProcess ? <Redirect to="/Manage" /> : null}
        <div className="completeReg" style={divWidth}>
          <form>
            <h1>עריכת קורס {this.props.className}</h1>
            <label>
              שם קורס
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              שם המארגן
              <input
                type="text"
                name="organizer"
                value={this.state.organizer}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מס' טלפון
              <input
                type="tel"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מיקום
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מינימום משתתפים
              <input
                type="number"
                name="minPartici"
                value={this.state.minPartici}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מקסימום משתתים
              <input
                type="number"
                name="maxPartici"
                value={this.state.maxPartici}
                onChange={this.handleChange}
              />
            </label>

            <label>
              תאריך
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>

            <label>
              שעה
              <input
                type="time"
                name="hour"
                value={this.state.hour}
                onChange={this.handleChange}
              />
            </label>

            <label>
              תיאור
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <div className="imgclassManagec">
                <img className="class_e" src={this.state.imgUrl} />
                <div className="classet">{this.state.progress}שנה תמונה</div>
              </div>
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage().ref("classImg")}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
            <ShowPartici
              particiList={this.state.particiList}
              removePartici={this.removePartici}
            />
            {!this.state.isConfirmed ? (
              <input
                className="registerbtn"
                type="button"
                value="אשר חוג"
                onClick={() => {
                  this.setState({ isConfirmed: true });
                }}
              />
            ) : (
              <input
                className="registerbtn"
                style={{ backgroundColor: "red" }}
                type="button"
                value="בטל אישור חוג"
                onClick={() => {
                  this.setState({ isConfirmed: false });
                }}
              />
            )}
            <input
              className="registerbtn"
              type="button"
              value="שמור"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default ManageClass;
