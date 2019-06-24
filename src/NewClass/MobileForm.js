/*
 --Mobile form page-- using react ionic
 display mobile form when the user open the app by a mobile 
 page objective: get the the new class details from the organizer
 form fields:course name,category,organizer,phone number,location,min number of participants,max number of participants,description,date,hour,end time,img url,num of participants 
 valid form before submit
 support image upload 
 store the new class in the firebase DB 
 redirect to main page
 */
//*****IMPORTS*****
import React from "react";
import firebase from "../Firebase/FireBase.js";
import "./NewClass.css";
import FileUploader from "react-firebase-file-uploader";
import Alert from "react-s-alert";
import {
  IonInput,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonContent,
  IonApp,
  IonTextarea,
  IonLabel,
  IonButtons,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import "@ionic/core/css/core.css";
import "@ionic/core/css/text-alignment.css";
import { Redirect } from "react-router";
//display the categories in the selector
function CategeorySelector(props) {
  let categories = [];
  categories = props.categories;

  return (
    <div class="ionright">
      <IonItem text-right>
        <IonSelect
          class="ionrightinner"
          placeholder="קטגוריה"
          value={props.value}
          onIonChange={props.func}
          name="category"
        >
          {categories.map((object, i) => {
            return (
              <IonSelectOption key={i} value={object.type}>
                {object.type}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </div>
  );
}

class MobileForm extends React.Component {
  constructor(props) {
    super(props);

    let endOfProcess = false;
    let organizerId = "";
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
      date: "",
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
    this.alertMessage = this.alertMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
  }
  //alert function display the message if occur an error
  alertMessage(message) {
    Alert.info(message, {
      position: "top-right",
      effect: "slide",
      timeout: "none"
    });
  }
  // set the input to the right state , case date than parse the iso format to regular format
  handleChange(e) {
    if ([e.target.name] == "date") {
      let date = new Date(e.target.value);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();
      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      let dateAfterConvert = year + "-" + month + "-" + dt;
      this.setState({ [e.target.name]: dateAfterConvert });
    } else if ([e.target.name] == "hour" || [e.target.name] == "endTime") {
      let time = new Date(e.target.value);
      if (time == "Invalid Date") {
        return;
      }

      let h = time.getHours();
      let m = time.getMinutes();
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      let timeAfterConvert = h + ":" + m;
      this.setState({ [e.target.name]: timeAfterConvert });
    } else if (
      [e.target.name] == "maxPartici" ||
      [e.target.name] == "minPartici"
    ) {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  //validate the un required fields
  isValidForm() {
    if (this.state.category == "") {
      this.alertMessage("אנא בחר קטגוריה");

      return false;
    } else if (this.state.imgUrl == "") {
      this.alertMessage("נשמח לתמונה בבקשה");
      return false;
    } else if (this.state.hour == "" || this.state.date == "") {
      this.alertMessage("איך נדע מתי זה קורה? נצטרך תאריך ושעה בבקשה");
      return false;
    }

    return true;
  }

  // fetch all the categories from the db and display in the category selector label

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
        self.setState({ categoryList: categories });
      });
  }
  async handleSubmit(e) {
    console.log(this.state);
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
    alert(" תודה רבה! החוג נשלח לאישור ההנהלה ויוצג באתר לאחר מכן");
    this.endOfProcess = true;
    this.setState({});
    window.scrollTo(0, 0);
  }
  //upload image func
  handleUploadStart() {
    this.setState({ isUploading: true });
  }
  //upload image func
  handleUploadError(error) {
    console.error(error);
  }
  //upload image func
  handleProgress = progress => this.setState({ progress: progress + "%" });
  //upload image func
  handleUploadSuccess(filename) {
    this.setState({ isUploading: false });
    firebase
      .storage()
      .ref("formImages")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imgUrl: url, progress: [] }));
  }
  //render ionic form
  render() {
    return (
      <div>
        {}
        {this.endOfProcess ? <Redirect to="/" /> : null}
        <IonApp>
          <IonContent class="ionContent">
            <form onSubmit={this.handleSubmit}>
              <div className="style">
                <h1>נשמח לכמה פרטים</h1>
              </div>
              <IonItem text-right>
                <IonInput
                  background="Secondary"
                  color="Secondary"
                  required={true}
                  name="name"
                  placeholder="שם החוג"
                  type="text"
                  value={this.state.name}
                  onIonChange={this.handleChange}
                />
              </IonItem>

              <CategeorySelector
                value={this.state.category}
                func={this.handleChange}
                categories={this.state.categoryList}
              />

              <IonItem text-right>
                <IonInput
                  required={true}
                  placeholder="שם המארגן"
                  type="text"
                  name="organizer"
                  value={this.state.organizer}
                  onIonChange={this.handleChange}
                />
              </IonItem>
              <IonItem text-right>
                <IonInput
                  required={true}
                  type="tel"
                  placeholder="מס טלפון"
                  minlength={9}
                  maxlength={10}
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onIonChange={this.handleChange}
                />
              </IonItem>
              <IonItem text-right>
                <ion-icon name="pin" />
                <IonInput
                  required={true}
                  placeholder="מיקום המפגש"
                  name="location"
                  value={this.state.location}
                  onIonChange={this.handleChange}
                />
              </IonItem>

              <IonItem text-right>
                <IonInput
                  required={true}
                  min={0}
                  placeholder="מינימום משתתפים"
                  type="number"
                  name="minPartici"
                  value={this.state.minPartici}
                  onIonChange={this.handleChange}
                />
              </IonItem>
              <IonItem text-right>
                <IonInput
                  min={this.state.minPartici}
                  required={true}
                  type="number"
                  name="maxPartici"
                  placeholder="מקסימום משתתפים"
                  value={this.state.maxPartici}
                  onIonChange={this.handleChange}
                />
              </IonItem>

              <div class="ionright">
                <IonItem>
                  <IonDatetime
                    class="ionrightinner"
                    placeholder="תאריך"
                    picker-format="YYYY-MM-DD"
                    display-format="YYYY-MM-DD"
                    name="date"
                    min={2019}
                    value={this.state.date}
                    onIonChange={this.handleChange}
                  />
                </IonItem>
              </div>

              <div class="ionright">
                <IonItem>
                  <IonDatetime
                    class="ionrightinner"
                    placeholder="שעת התחלה"
                    displayFormat="HH:mm "
                    pickerFormat="HH:mm"
                    name="hour"
                    value={this.state.hour}
                    onIonChange={this.handleChange}
                  />
                </IonItem>
              </div>
              <div class="ionright">
                <IonItem>
                  <IonDatetime
                    class="ionrightinner"
                    placeholder="שעת סיום משוערת"
                    displayFormat="HH:mm "
                    pickerFormat="HH:mm"
                    name="endTime"
                    min={this.state.hour}
                    value={this.state.endTime}
                    onIonChange={this.handleChange}
                  />
                </IonItem>
              </div>

              <IonItem text-right>
                <IonTextarea
                  required={true}
                  rows={4}
                  cols={20}
                  placeholder="כמה מילים על הסדנא כדי שהחבר'ה ידעו מה הדיבור"
                  name="description"
                  value={this.state.description}
                  onIonChange={this.handleChange}
                />
              </IonItem>

              <IonItem>
                <div class="ionright">
                  <label>
                    <img
                      alt="הוספת תמונה"
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
                </div>
              </IonItem>

              <IonButton class="fancy-button" expand="block" type={"submit"}>
                שלח
              </IonButton>
            </form>
          </IonContent>
        </IonApp>
      </div>
    );
  }
}
export default MobileForm;
