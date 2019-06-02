import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./AllCourses.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: props.categoryName,
      classList: [],
      coursesArray: []
    };
  }
  handleClick(e) {
    console.log(e.target);
  }

  render() {
    let array = this.props.list.map(obj => {
      return (
        <Course
          categoryName={this.props.categoryName}
          img={obj.imgUrl}
          className={obj.name}
          date={obj.date}
          handleClick={this.handleClick}
        />
      );
    });

    return <div className="all-image-div">{array}</div>;
  }
}

function Course(props) {
  let newPath = "/ManageClass/" + props.categoryName + "/" + props.className;
  return (
    <div>
      <Link to={newPath}>
        <div className="div-button">
          <button> ערוך את {props.className}</button>
        </div>
      </Link>

      <div className="img-div">
        <img style={{ width: 200, height: 200 }} src={props.img} />
      </div>
      <hr />
    </div>
  );
}
export default AllCourses;
