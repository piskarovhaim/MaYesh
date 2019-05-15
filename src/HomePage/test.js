import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import "./AllCategory.css";
import { Route } from "react-router";
 
class Test extends Component{


    constructor(props){
        super(props)
        this.state = {
            name: props.name
          }
          
    }


  render() {
     
    return (
      <div className="AllCategory">
            <h1>hii {this.state.name}
      </h1>
      </div>
    )
  }
}


export default Test;