/*
--ALL CATEGORIES COMPONENT--
map all the courses in the category and display each image in a square
when click on a image to edit the course --> redirect to manage class page
 */
import React, { Component } from "react";
import "./AllCourses.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./MainManagePage.css";

class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: props.categoryName, // get the category name pass by the props
      classList: props.list
    };
  }

  render() {
    let style = {}
    if(window.innerWidth < 500)
        style.width = '85%'
    return (
      <div className="manageAllCategory" style={style}>
        <h1> עריכת החוגים בקטגוריה</h1>
        {Object.values(this.props.list).map((object, i) => {
          let str =
            "/ManageClass/" + this.props.categoryName + "/" + object.name;
          return (
            <div className="manageCat" key={i}>
              <Link to={str}>
                <img className="imgmanageCat" src={object.imgUrl} />
                <div className="textdivmanage" style={{ padding: "4px" }}>
                  {object.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default AllCourses;
