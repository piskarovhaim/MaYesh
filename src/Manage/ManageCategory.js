import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./ManageCategory.css";
import AllCourses from "./AllCourses.js";
import NavBar from "../NavBar/NavBar";
class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "ספורט",
      img: "",
      desc: "",
      classList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/CategoryList/" + this.state.categoryName);
    ref.on("value", snapshot => {
      let arr = [];
      Object.keys(snapshot.val().classList).forEach(function(key) {
        arr.push(snapshot.val().classList[key]);
      });

      this.setState({
        categoryName: snapshot.val().name,
        img: snapshot.val().img,
        desc: snapshot.val().desc,
        classList: arr
      });
    });
  }
  handleSubmit(e) {
    console.log(this.state);

    e.preventDefault();
    alert("לתקן שבאמת ישנה בפיירבייס");
    // let ref = firebase
    //   .database()
    //   .ref("/CategoryList/" + this.state.categoryName);
    // ref.set({
    //   desc: this.state.desc,
    //   img: this.state.imgUrl,
    //   name: this.state.categoryName,
    //   classList: this.state.classList
    // });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>EDIT CATEGORY</h1>
          <h1>{this.state.categoryName}</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              {this.state.categoryName}
              <input
                type="text"
                name="categoryName"
                placeholder={this.state.categoryName}
                onChange={this.handleChange}
              />
            </label>
            <label>
              img url
              <input
                type="text"
                name="imgUrl"
                placeholder={this.state.imgUrl}
                onChange={this.handleChange}
              />
            </label>
            <label>
              description
              <input
                type="text"
                name="desc"
                placeholder={this.state.desc}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input type="submit" />
            </label>
          </form>
        </div>
        <div className="all-courses-div">
          <h3> כל הקורסים של הקטגוריה</h3>
          <hr />
        </div>
        <AllCourses
          list={this.state.classList}
          categoryName={this.state.categoryName}
        />
      </div>
    );
  }
}
export default ManageCategory;
