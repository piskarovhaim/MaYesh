import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import firebase from "../Firebase/FireBase.js";
import './HomePage.css'
import NetflixSlider from "../NetflixSlider/NetflixSlider.js";

/*
  AllCategories - read from the database all the categories,
  show in "netflix style"
*/

class AllCategories extends Component {

  constructor(props){
    super(props)
    this.state = {
     categoryList: [],
    };
    this.updateWindows = this.updateWindows.bind(this)
  }

  updateWindows(){
    this.setState({})
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWindows);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindows);

    // read from the database all the categories
    let ref = firebase.database().ref("/CategoryList");
    ref.on("value", snapshot => {
      let arrTemp = []; // array temp for ths categories list
      snapshot.forEach(child => {
            arrTemp.push(child.val());
      });
      this.setState({ categoryList: arrTemp });
    });
  }

  render() {
    return (
      <div>
        <div className="titleClassesBy">כל הקטגוריות</div>
          <NetflixSlider classList={this.state.categoryList} type="category"/>
       </div>
    )
  }
}

export default AllCategories;
