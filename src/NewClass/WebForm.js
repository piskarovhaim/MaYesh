/*
 --WEB FORM page-- using html form
 display web form when the user open the app by a pc 
 page objective: get the the new class details from the organizer
 form fields:course name,category,organizer,phone number,location,min number of participants,max number of participants,description,date,hour,end time,img url,num of participants 
 valid form before submit
 support image upload 
 store the new class in the firebase DB 
 redirect to main page
 */

//*****IMPORTS*****
import React, { Component } from "react";
import "../Login/FormStyle.css";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import NavBar from "../NavBar/NavBar";
import firebase from "../Firebase/FireBase.js";
import { Redirect } from "react-router";
import bgImg from "./formBG.jpg";
import Alert from "react-s-alert";
//display the categories in the selector
function CategeorySelector(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;

  return (
    <select value={props.value} onChange={props.func} name="category" dir="rtl">
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
      numOfCurrPartici: 0,
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
      Alert.info("אנא בחר קטגוריה");

      return false;
    } else if (this.state.imgUrl == "") {
      Alert.info("נשמח לתמונה בבקשה");
      return false;
    } else if (this.state.hour == "" || this.state.date == "") {
      Alert.info("איך נדע מתי זה קורה? נצטרך תאריך ושעה בבקשה");
      return false;
    }

    return true;
  }
  //fetch the categories from the DB
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
  // set the input to the right state
  handleChange(e) {
    if ([e.target.name] == "maxPartici" || [e.target.name] == "minPartici") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  //check for valid ,wait if still in upload ,redirect to main page
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
    this.endOfProcess = true;
    this.setState({});
    window.scrollTo(0, 0);
    Alert.success("תודה רבה! החוג נשלח לאישור ההנהלה ויוצג באתר לאחר שיאושר");
  }
  //upload image funcs
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
    let selectImg = false;
    if (this.state.imgUrl != "") selectImg = true;
    return (
      <div>
        <div
          className="formPage"
          style={{ "background-image": `url(${bgImg})` }}
        >
          <NavBar />
          <div className="completeReg">
            <h1 className="headLineForm">טופס רישום חוג חדש</h1>
            <div className="formEx">
              <h1 className="fillDetLab">אנא מלא פרטים</h1>
              <form onSubmit={this.handleSubmit}>
                <label>
                  <span className="labl"> שם החוג </span>
                  <input
                    className="inpt"
                    required
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </label>

                <label>
                  <span className="labl">קטגוריה</span>
                  <CategeorySelector
                    value={this.state.category}
                    func={this.handleChange}
                    categories={this.state.categoryList}
                  />
                </label>

                <label>
                  <span className="labl">שם המארגן</span>
                  <input
                    className="inpt"
                    required
                    type="text"
                    name="organizer"
                    value={this.state.organizer}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  <span className="labl">מס' טלפון</span>
                  <input
                    className="inpt"
                    required
                    minlength={9}
                    maxLength={10}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </label>

                <div className="formLine">
                  <label>
                    <span className="labl">מיקום המפגש </span>
                    <input
                      className="inpt"
                      required
                      type="text"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                      placeholder={"לדוגמא: רחוב אבן ספיר 15,קומה ב"}
                    />
                  </label>

                  <label>
                    <span className="labl">מינימום משתתפים</span>
                    <input
                      className="inpt"
                      required
                      min={0}
                      type="number"
                      name="minPartici"
                      value={this.state.minPartici}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label>
                    <span className="labl">מקסימום משתתפים</span>
                    <input
                      className="inpt"
                      required
                      min={this.state.minPartici}
                      type="number"
                      name="maxPartici"
                      value={this.state.maxPartici}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label>
                    <span className="labl">תאריך</span>
                    <input
                      className="inpt"
                      placeholder={this.state.date}
                      required
                      type="date"
                      name="date"
                      min="2019-01-01"
                      value={this.state.date}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label>
                    <span className="labl">שעת התחלה</span>
                    <input
                      className="inpt"
                      required
                      type="time"
                      name="hour"
                      value={this.state.hour}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label>
                    <span className="labl">שעת סיום משוערת</span>
                    <input
                      className="inpt"
                      required
                      type="time"
                      name="endTime"
                      value={this.state.endTime}
                      onChange={this.handleChange}
                      min={this.state.hour}
                    />
                  </label>

                  <label>
                    <span className="labl">תיאור החוג</span>
                    <textarea
                      className="inpt"
                      rows="4"
                      cols="50"
                      required
                      name="description"
                      placeholder="כמה מילים על הסדנא כדי שהחבר'ה ידעו מה הדיבור"
                      value={this.state.description}
                      onChange={this.handleChange}
                      style={{ color: "black" }}
                    />
                  </label>
                </div>

                <label>
                  <br />

                  {selectImg ? (
                    <div className="imgusercWebForm">
                      <img
                        className="imgWebForm"
                        alt="החלף תמונה"
                        src={this.state.imgUrl}
                      />
                      <div className="useretWebForm">
                        {this.state.progress}שנה תמונה
                      </div>
                    </div>
                  ) : (
                    <div className="pinkBtnWebForm">
                      תוסיף תמונה {this.state.progress}
                    </div>
                  )}

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

                <input
                  required
                  className="greenBtnWebForm"
                  type="submit"
                  value="שלח"
                />
              </form>
            </div>
          </div>
        </div>
        {this.endOfProcess ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

export default WebForm;
