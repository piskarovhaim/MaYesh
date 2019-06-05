import React, { Component } from "react";
import "./AllCourses.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './MainManagePage.css'

class AllCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: props.categoryName,
      classList: props.list,
    };
  }

  render() {
    return (
      <div className="manageAllCategory">
        <h1> עריכת החוגים בקטגוריה</h1>
          {Object.values(this.props.list).map((object, i) => {
            let str = "/ManageClass/" + this.props.categoryName + "/" + object.name;
            return (
              <div className="manageCat" key={i}>
              <Link to={str}>
              <img className="imgmanageCat" src={object.imgUrl}/>
              <div className="textdivmanage" style={{padding:'4px'}}>
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
