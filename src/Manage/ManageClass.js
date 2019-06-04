import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import NavBar from "../NavBar/NavBar";
import "../Login/FormStyle.css";
import { Redirect } from "react-router";
import Permissions from "./Permissions";
// function CategorySelector(props) {
//   let categories = [];
//   categories = props.categories;

//   return (
//     <select value={props.value} onChange={props.func} name="category">
//       {categories.map((object, i) => {
//         return (
//           <option key={i} value={object.type}>
//             {object.type}
//           </option>
//         );
//       })}
//     </select>
//   );
// }

class ManageClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.className,
      category: props.categoryName,
      organizer: "",
      phoneNumber: "",
      location: "",
      minPartici: "",
      maxPartici: "",
      date: "",
      hour: "",
      description: "",
      imgUrl: "",
      categoryList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState(snapshot.val());
    });

    let categories = [];
    let self = this;
    firebase
      .database()
      .ref("CategoryList/")
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
  async handleSubmit() {
    if (window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?") == false) {
      return;
    }
    console.log(this.state);
    await this.setState({ categoryList: [] });
    alert(this.state.className);
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
  }
  render() {
    return (
      <div>
        <NavBar />
        <Permissions />
        <hr />

        <div className="completeReg">
          <form onSubmit={this.handleSubmit}>
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
              קישור לתמונה
              <input
                type="text"
                name="imgUrl"
                value={this.state.imgUrl}
                onChange={this.handleChange}
              />
            </label>

            <input className="registerbtn" type="submit" value="שמור" />
          </form>
        </div>
        {this.endOfProcess ? <Redirect to="/ManageClass" /> : null}
      </div>
    );
  }
}
export default ManageClass;
