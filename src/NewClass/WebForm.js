import React, { Component } from "react";
import "../Login/FormStyle.css";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import NavBar from "../NavBar/NavBar";
import firebase from "../Firebase/FireBase.js";
import { Redirect } from "react-router";

function CategeorySelector(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;

  return (
    <select value={props.value} onChange={props.func} name="category">
      {categories.map((object, i) => {
        return (
          <option key={i} value={object.type}>
            {object.type}
          </option>
        );
      })}
    </select>
  );
}

class WebForm extends Component {
  constructor(props) {
    super(props);
    let endOfProcess = false;
    let organizerId = "";

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "/" + mm + "/" + dd;
    if (props.user != undefined) organizerId = props.user.id;
    this.state = {
      name: "",
      category: "",
      organizer: "",
      phoneNumber: "",
      location: "",
      minPartici: "",
      maxPartici: "",
      description: "",
      date: today,
      hour: "",
      endTime: "",
      imgUrl: "",
      numOfPartici: 0,
      isUploading: false,
      isConfirmed: false,
      organizerId: organizerId,
      categoryList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
  }
  isValidForm() {
    if (this.state.category == "") {
      alert("מה לא תבחר קטגוריה??");
      return false;
    }
    if (this.state.imgUrl == "") {
      alert("אנו נשמח לתמונה בבקשה");
      return false;
    } else if (this.state.hour == "" || this.state.date == "") {
      alert("איך נדע מתי זה קורה? נצטרך תאריך ושעה בבקשה");
      return false;
    }
    return true;
  }
  componentDidMount() {
    let categories = [];
    let self = this;
    firebase
      .database()
      .ref("/CategoryList/")
      .once("value")
      .then(function(snapshot) {
        Object.keys(snapshot.val()).forEach(function(value) {
          categories.push({ type: value });
        });
        if (self.state.category == "" && categories.length > 0) {
          self.setState({
            categoryList: categories,
            category: categories[0].type
          });
        } else {
          self.setState({ categoryList: categories });
        }
      });
  }

  handleChange(e) {
    if ([e.target.name] == "maxPartici" || [e.target.name] == "minPartici") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    if (!this.isValidForm()) {
      return;
    }
    if (this.state.isUploading) {
      return;
    }
    await this.setState({ isUploading: null });
    let ref = firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.state.category +
          "/classList" +
          "/" +
          this.state.name +
          "/"
      );
    ref.set(this.state);

    ref = firebase
      .database()
      .ref(
        "/CategoryList/" +
          this.state.category +
          "/classList/" +
          this.state.name +
          "/categoryList"
      );
    ref.remove();
    alert("תודה רבה! הטופס נשלח לאישור ההנהלה");
    this.endOfProcess = true;

    this.setState({});
  }

  handleUploadStart() {
    this.setState({ isUploading: true });
  }
  handleUploadError(error) {
    console.error(error);
  }
  handleProgress = progress => this.setState({ progress: progress + "%" });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  handleUploadSuccess(filename) {
    this.setState({ isUploading: false });
    firebase
      .storage()
      .ref("formImages")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imgUrl: url, progress: [] }));
  }

  render() {
    return (
      <div>
        <NavBar />
        <hr />
        <div className="completeReg">
          <form onSubmit={this.handleSubmit}>
            <h1>נשמח לכמה פרטים</h1>
            <label>
              שם הסדנא
              <input
                required
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              קטגוריה
              <CategeorySelector
                value={this.state.category}
                func={this.handleChange}
                categories={this.state.categoryList}
              />
            </label>

            <label>
              שם המארגן
              <input
                required
                type="text"
                name="organizer"
                value={this.state.organizer}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מס' טלפון
              <input
                required
                minlength={9}
                maxLength={10}
                type="tel"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מיקום
              <input
                required
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מינימום משתתפים
              <input
                required
                min={0}
                type="number"
                name="minPartici"
                value={this.state.minPartici}
                onChange={this.handleChange}
              />
            </label>

            <label>
              מקסימום משתתפים
              <input
                required
                min={this.state.minPartici}
                type="number"
                name="maxPartici"
                value={this.state.maxPartici}
                onChange={this.handleChange}
              />
            </label>

            <label>
              תאריך
              <input
                required
                type="date"
                name="date"
                min="2019-01-01"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>

            <label>
              שעת התחלה
              <input
                required
                type="time"
                name="hour"
                value={this.state.hour}
                onChange={this.handleChange}
              />
            </label>
            <label>
              שעת סיום משוערת
              <input
                required
                type="time"
                name="endTime"
                value={this.state.endTime}
                onChange={this.handleChange}
                min={this.state.hour}
              />
            </label>

            <label>
              תיאור
              <textarea
                rows="4"
                cols="50"
                required
                name="description"
                placeholder="כמה מילים על הסדנא כדי שהחבר'ה ידעו מה הדיבור"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <br />

              <img
                alt="תמונה"
                style={{ width: 55, height: 55 }}
                src={this.state.imgUrl}
              />
              {this.state.progress}
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage().ref("formImages")}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onUploadStart={this.handleUploadStart}
                onProgress={this.handleProgress}
              />
            </label>

            <input required className="registerbtn" type="submit" value="שלח" />
          </form>
        </div>
        {this.endOfProcess ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default WebForm;
