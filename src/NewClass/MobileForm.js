import React from "react";
import firebase from "../Firebase/FireBase.js";
import "./NewClass.css";
import FileUploader from "react-firebase-file-uploader";
import NavBar from "../NavBar/NavBar";
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

function CategeorySelector(props) {
  // get the real category json from the DB

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
  handleChange(e) {
    if ([e.target.name] == "maxPartici" || [e.target.name] == "minPartici") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
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
      alert("איך נדע מתי זה קורה? אנא מלא תאריך ושעה");
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
        self.setState({ categoryList: categories });
      });
  }

  async handleSubmit(e) {
    console.log(this.state);
    e.preventDefault();
    if (!this.isValidForm()) {
      //alert("אנא מלא את כל הטופש בבקשה");
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
    alert("תודה רבה! הטופס נשלח לאישור ההנהלה");
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
        {this.endOfProcess ? <Redirect to="/" /> : null}
        <IonApp>
          <IonContent class="ionContent">
            <form onSubmit={this.handleSubmit}>
              <div className="style">
                <h1>כמה פרטים קטנים</h1>
              </div>
              <IonItem text-right>
                <IonInput
                  background="Secondary"
                  color="Secondary"
                  required={true}
                  name="name"
                  placeholder="שם הקורס"
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
                  placeholder="מיקום"
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
                    display-format="DD/MM/YYYY"
                    picker-format="DD-MMMM-YYYY"
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
                    placeholder="שעה"
                    displayFormat="HH:mm "
                    name="hour"
                    value={this.state.hour}
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
                <label>
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
