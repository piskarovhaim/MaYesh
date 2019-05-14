import React, { Component } from "react";
import ManagePage from "./ManagePage/ManagePage";
import NavBar from "./NavBar/NavBar";
import NewClass from "./NewClass/NewClass";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import firebase from "../Firebase/FireBase.js";


class Category extends Component {

  constructor(props) {
      this.searchCategory = this.searchCategory.bind(this);
    super(props);
    this.state = {
       name: "" 
    }
  }
  componentDidMount(){
    this.setState({
        name: this.props.name
    })
  }
 async searchCategory(){
    let db = firebase.database();
    let collection = db.ref("CategoryList/"+this.state.name);
    console.log(collection);

  }
  render() {
    this.searchCategory();
    return (
        <div></div>
    )
  }
}

export default App;
