import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import Category from "../Category/Category.js";
import "./ManageCategory.css";
class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="top">
          <h1>Category Name</h1>
          <form>
            <label>
              category name
              <input type="text" name="name" />
            </label>
          </form>
        </div>
        <div className="bottom">
          <Category name="Sport" />
        </div>
      </div>
    );
  }
}
export default ManageCategory;
