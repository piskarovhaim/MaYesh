import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./NewClass.css";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonContent,
  IonApp,
  IonTextarea
} from "@ionic/react";
import "@ionic/core/css/core.css";
//import "@ionic/core/css/ionic.bundle.css";

function CategeorySelector(props) {
  // get the real category json from the DB
  let objectOptions = [
    {
      type: "Yuga"
    },
    {
      type: "Sport"
    },
    {
      type: "Cooking"
    },
    {
      type: "Art"
    },
    {
      type: "Lecture"
    }
  ];
  return (
    <IonItem>
      <IonLabel>קטגוריה</IonLabel>
      <IonSelect value={props.value} onIonChange={props.func} name="category">
        {objectOptions.map((object, i) => {
          return (
            <IonSelectOption value={object.type}>{object.type}</IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
}


class NewClass extends Component {
  constructor() {
    super();
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
      isConfirmed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  handleClear() {
    const initialState = {
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
      isConfirmed: false
    };
    this.setState(initialState);
    console.log(this.state);
  }
  isValidForm() {
    let arr = Object.keys(this.state);
    let i;
    for (i = 0; i < arr.length; i++) {
      if (this.state[arr[i]] === "" && arr[i] !== "isConfirmed") {
        return false;
      }
      return true;
    }
  }
  handleSubmit() {
    if (!this.isValidForm()) {
      alert("מלא את כל הטופס בבקשה");
      return;
    }
    const messageRef = firebase
      .database()
      .ref("/CategoryList/" + this.state.category + "/classList");

    let arr = [];

    messageRef.on("value", snapshot => {
      snapshot.forEach(child => {
        arr.push(child.val());
      });
    });

    // let newMessage = messageRef.push();
    // newMessage.set(this.state);

    arr.push(this.state);
    //console.log(arr);
    messageRef.set(arr);
  }
  
  render() {
    return (
      <div>
       <IonApp>
        <IonContent>
          <h1 className="content">טופס הצעת קורס</h1>

          <IonItem>
            <IonLabel position="floating" required={true}>
              שם הקורס
            </IonLabel>
            <IonInput
              name="name"
              value={this.state.name}
              onIonChange={this.handleChange}
            />
          </IonItem>

          <CategeorySelector
            value={this.state.category}
            func={this.handleChange}
          />

          <IonItem>
            <IonLabel position="floating">שם המארגן</IonLabel>
            <IonInput
              name="organizer"
              value={this.state.organizer}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">מספר טלפון</IonLabel>
            <IonInput
              type="number"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">מיקום הקורס</IonLabel>
            <IonInput
              name="location"
              value={this.state.location}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">מס משתתפים מינימלי</IonLabel>
            <IonInput
              type="number"
              name="minPartici"
              value={this.state.minPartici}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">מס משתתפים מקסימלי</IonLabel>
            <IonInput
              type="number"
              name="maxPartici"
              value={this.state.maxPartici}
              onIonChange={this.handleChange}
            />
          </IonItem>

          <IonItem>
            <IonLabel>תאריך</IonLabel>
            <IonDatetime
              name="date"
              min="2019"
              value={this.state.date}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel>שעה</IonLabel>
            <IonDatetime
              displayFormat="HH:mm "
              name="hour"
              value={this.state.hour}
              onIonChange={this.handleChange}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">תיאור</IonLabel>
            <IonTextarea
              name="description"
              value={this.state.description}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonButton shape="round" expand="block" onClick={this.handleClear}>
            נקה
          </IonButton>
          <IonButton shape="round" expand="block" onClick={this.handleSubmit}>
            שלח
          </IonButton>
        </IonContent>
      </IonApp>
      </div>
    );
  }
}
export default NewClass;
