import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import AllCategories from './AllCategories.js'
import './HomePage.css'
import Video from './Video.js'
import ClassBy from'./ClassBy.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (   
          <div className="home">
                <NavBar />
                <Video/>
              <ClassBy sortBy="date"/>
              <AllCategories/>
          </div>
        
     
    );
  }
}

export default HomePage;
