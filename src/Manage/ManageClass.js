import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import NavBar from "../NavBar/NavBar";
import "../Login/FormStyle.css";
import { Redirect } from "react-router";
import Permissions from "./Permissions";

import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import "./ManageClass.css";

function ShowPartici(props) {
  let particiList = [];
  let particiListKey = [];

  if (props.particiList !== null && props.particiList !== undefined) {
    particiList = Object.values(props.particiList);
    particiListKey = Object.keys(props.particiList);
    console.log(particiListKey);
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
      progress: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.removePartici = this.removePartici.bind(this);
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
      if (tempState.numOfCurrPartici < 1) tempState.particiList = [];
      this.setState(tempState);
    });
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
    if (window.innerWidth < 500)
      // if it is phone set the width to 100%
      divWidth.maxWidth = "100%";
    return (
      <div>
        <NavBar />
        <Permissions />
        <hr />

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
            <input
              className="registerbtn"
              type="bottun"
              value="שמור"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
        {this.endOfProcess ? <Redirect to="/Manage" /> : null}
      </div>
    );
  }
}
export default ManageClass;
