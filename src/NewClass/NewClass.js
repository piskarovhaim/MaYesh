import React from "react";
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
  IonTextarea,
  IonButtons,
  IonTabBar,
  IonToolbar
} from "@ionic/react";

import "@ionic/core/css/core.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect } from "react-router";
function CategeorySelector(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;

  return (
    <IonItem>
      <IonSelect
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
  );
}

class NewClass extends React.Component {
  constructor(props) {
    super(props);
    let endOfProcess = false;
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
      isConfirmed: false,
      categoryList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClear() {
    let categories = this.state.categoryList;

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
      isConfirmed: false,
      categoryList: categories
    };
    this.setState(initialState);
    console.log(this.state);
  }
  isValidForm() {
    let arr = Object.keys(this.state);
    let i;
    let numOfprivateStates = 2;
    for (i = 0; i < arr.length - numOfprivateStates; i++) {
      if (this.state[arr[i]] == "") {
        return false;
      }
      return true;
    }
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

  handleSubmit() {
    // if (!this.isValidForm()) {
    //   alert("מלא את כל הטופס בבקשה");
    //   return;
    // }

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
  }

  render() {
    return (
      <div>
        <IonApp>
          <IonContent>
            <div className="style">
              <h1>טופס הצעת קורס</h1>
            </div>
            <IonItem>
              <IonInput
                name="name"
                placeholder="שם הקורס"
                value={this.state.name}
                onIonChange={this.handleChange}
              />
            </IonItem>

            <CategeorySelector
              value={this.state.category}
              func={this.handleChange}
              categories={this.state.categoryList}
            />

            <IonItem>
              <IonInput
                placeholder="שם המארגן"
                name="organizer"
                value={this.state.organizer}
                onIonChange={this.handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="מס טלפון"
                type="tel"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onIonChange={this.handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="מיקום"
                name="location"
                value={this.state.location}
                onIonChange={this.handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="מינימום משתתפים"
                type="number"
                name="minPartici"
                value={this.state.minPartici}
                onIonChange={this.handleChange}
              />
            </IonItem>
            <IonItem>
              <IonInput
                type="number"
                name="maxPartici"
                placeholder="מקסימום משתתפים"
                value={this.state.maxPartici}
                onIonChange={this.handleChange}
              />
            </IonItem>

            <IonItem>
              <IonDatetime
                placeholder="תאריך"
                name="date"
                min="2019"
                value={this.state.date}
                onIonChange={this.handleChange}
              />
            </IonItem>
            <IonItem>
              <IonDatetime
                placeholder="שעה"
                displayFormat="HH:mm "
                name="hour"
                value={this.state.hour}
                onIonChange={this.handleChange}
              />
            </IonItem>

            <IonItem>
              <IonTextarea
                placeholder="תיאור"
                name="description"
                value={this.state.description}
                onIonChange={this.handleChange}
              />
            </IonItem>

            <IonButton
              shape="round"
              expand="block"
              color="dark"
              onClick={this.handleClear}
            >
              נקה
            </IonButton>

            <IonButton
              shape="round"
              expand="block"
              color="dark"
              onClick={this.handleSubmit}
            >
              שלח
            </IonButton>
          </IonContent>
        </IonApp>
        {this.endOfProcess ? <Redirect to="/" /> : null}
      </div>
    );
  }
}
export default NewClass;
