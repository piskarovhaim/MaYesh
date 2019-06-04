import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./ManageCategory.css";
import AllCourses from "./AllCourses.js";
import NavBar from "../NavBar/NavBar";
import Permissions from "./Permissions";
import { Redirect } from "react-router";
class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //fix here to " props.name"
      categoryName: props.name,
      img: "",
      desc: "",
      classList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategoryInClassList = this.updateCategoryInClassList.bind(this);
  }
  updateCategoryInClassList() {
    let str;
    let arr = this.state.classList;
    Object.values(arr).map(obj => {
      obj.category = this.state.categoryName;
    });
    this.setState({ classList: arr });
  }
  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/CategoryList/" + this.state.categoryName);

    ref.once("value", snapshot => {
      let arr = [];

      if (snapshot.val().classList != undefined) {
        Object.keys(snapshot.val().classList).forEach(function(key) {
          arr[snapshot.val().classList[key].name] = snapshot.val().classList[
            key
          ];
        });

        this.setState({
          categoryName: snapshot.val().name,
          img: snapshot.val().img,
          desc: snapshot.val().desc,
          classList: arr
        });
      }
    });
  }
  async handleSubmit() {
    if (window.confirm("האם אתה בטוח שברצונך לשמור את השינויים?") == false) {
      return;
    }

    await this.updateCategoryInClassList();

    let ref = firebase.database().ref("/CategoryList/" + this.props.name);
    ref.remove();
    ref = firebase.database().ref("/CategoryList/" + this.state.categoryName);
    ref.set({
      classList: this.state.classList,
      desc: this.state.desc,
      img: this.state.img,
      name: this.state.categoryName
    });

    this.endOfProcess = true;
    this.setState({});
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div>
        {this.endOfProcess ? (
          <Redirect to="/" />
        ) : (
          <div>
            <Permissions />
            <NavBar />
            <div className="container">
              <h1>עריכת קטגוריה</h1>
              <h1>{this.props.name}</h1>
              <form>
                <label>
                  שם הקטגוריה
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
                    name="img"
                    placeholder={this.state.img}
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
                  <button onClick={this.handleSubmit}> SUBMIT </button>
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
        )}
      </div>
    );
  }
}
export default ManageCategory;
