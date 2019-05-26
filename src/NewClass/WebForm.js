import React, { Component } from "react";
import '../Login/FormStyle.css'
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
      this.setState({});
      }
    render(){

    return(
        <div>
        <NavBar/>
        <hr/>

        <div className="completeReg">
        <form onSubmit={this.handleSubmit}>
        <h1>טופס חוג חדש</h1>
        <label>
        שם קורס
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>  
        </label>

        <label>
        קטגוריה
        <CategeorySelector value={this.state.category} func={this.handleChange} categories={this.state.categoryList}/>
        </label>

        <label>
        שם המארגן
        <input type="text" name="organizer" value={this.state.organizer} onChange={this.handleChange}></input>
        </label>

        <label>
        מס' טלפון
        <input type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}></input>
        </label>

        <label>
        מיקום
        <input type="text" name="location" value={this.state.location} onChange={this.handleChange}></input>
        </label>

        <label>
        מינימום משתתפים
        <input type="number" name="minPartici" value={this.state.minPartici} onChange={this.handleChange}></input>
        </label>

        <label>
        מקסימום משתתים
        <input type="number" name="maxPartici" value={this.state.maxPartici} onChange={this.handleChange}></input>
        </label>

        <label>
        תאריך
        <input type="date" name="date" value={this.state.date} onChange={this.handleChange}></input>
        </label>

        <label>
        שעה
        <input type="time" name="hour" value={this.state.hour} onChange={this.handleChange}></input>
        </label>

        <label>
        תיאור
        <textarea name="description" value={this.state.description} onChange={this.handleChange}></textarea>
        </label>

        <input className="registerbtn" type="submit" value="שמור" />
      </form>
        </div>
        {this.endOfProcess ? <Redirect to="/" /> : null}
        </div>
        )
    }

}

export default WebForm;