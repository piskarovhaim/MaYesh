import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import AllCategories from './AllCategories.js'
import './HomePage.css'
import Video from './Video.js'
import ClassBy from'./ClassBy.js';
import Contact from './Contact.js'

class HomePage extends Component {
  constructor(props) {
    super(props);
    let location = window.location.pathname
    if(location == "/Login")
        location = "/"
    this.state = {
      pageYOffset : 0
    };
    this.listenToScroll = this.listenToScroll.bind(this)
  }

  listenToScroll(){
    this.setState({pageYOffset:window.pageYOffset})
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.listenToScroll)
  }
  render() {
    let padding = 0;
    if(this.state.pageYOffset > 0)
      padding=10;
    return (   
          <div className="home">
              <div className="navAndvideo" style={{paddingTop:padding+'vh'}}>
                <NavBar />
                <Video/>
                <section id="joinToClass">
                <div className="videogradient" style={{bottom:-padding+'vh'}}/>
                </section>
                </div>
                
                <ClassBy sortBy="thebestforme"/>
              <ClassBy sortBy="date"/>
              <AllCategories/>
              
          </div>
        
     
    );
  }
}

export default HomePage;
