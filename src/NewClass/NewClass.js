import React, { Component } from "react";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import firebase from "../Firebase/FireBase.js";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonDatetime
} from "@ionic/react";

class NewClass extends React.Component {
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
      date: "",
      isConfirmed: false
    };
    this.setState(initialState);
    console.log(this.state);
  }

  handleSubmit() {
    const messageRef = firebase
      .database()
      .ref("/CategoryList/" + "food" + "/classList");

    let arr = [];

    messageRef.on("value", snapshot => {
      snapshot.forEach(child => {
        arr.push(child.val());
      });
    });

    // let newMessage = messageRef.push();
    // newMessage.set(this.state);

    arr.push(this.state);
    console.log(arr);
    messageRef.set(arr);
  }
  render() {
    return (
      <div className="content">
        <h1>טופס הצעת קורס</h1>
        <div className="details">
          <IonItem>
            <IonLabel position="floating">שם הקורס</IonLabel>
            <IonInput
              name="name"
              value={this.state.name}
              onIonChange={this.handleChange}
            />
          </IonItem>

          <IonItem>
            <IonLabel>קטגוריה</IonLabel>
            <IonSelect
              value={this.state.category}
              onIonChange={this.handleChange}
              name="category"
            >
              <IonSelectOption value="music">Music</IonSelectOption>
              <IonSelectOption value="Yuga">Yuga</IonSelectOption>
              <IonSelectOption value="cooking">Cooking</IonSelectOption>
              <IonSelectOption value="Sport">Sport</IonSelectOption>
            </IonSelect>
          </IonItem>

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
            <IonLabel position="floating">תיאור</IonLabel>
            <IonInput
              name="description"
              value={this.state.description}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">תאריך</IonLabel>
            <IonDatetime
              name="date"
              value={this.state.date}
              onIonChange={this.handleChange}
            />
          </IonItem>
          <IonButton
            color="dark"
            shape="round"
            expand="block"
            onClick={this.handleClear}
          >
            נקה
          </IonButton>
          <IonButton
            color="dark"
            shape="round"
            expand="block"
            onClick={this.handleSubmit}
          >
            שלח
          </IonButton>
        </div>
      </div>
    );
  }
}
// class App extends Component {
//   render() {
//     return <Form />;
//   }
// }

export default NewClass;
