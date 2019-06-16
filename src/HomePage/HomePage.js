import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import AllCategories from './AllCategories.js'
import './HomePage.css'
import Video from './Video.js'
import ClassBy from'./ClassBy.js';
import Contact from './Contact.js'
import NetflixSlider from "../NetflixSlider/NetflixSlider";

class HomePage extends Component {

  render() {
    return (   
          <div className="home">
              <div className="nav+video">
                <NavBar />
                <Video/>
                </div>
                <ClassBy sortBy="thebestforme"/>
              <ClassBy sortBy="date"/>
              <Contact/>
              <AllCategories/>
          </div>
        
     
    );
  }
}

export default HomePage;
