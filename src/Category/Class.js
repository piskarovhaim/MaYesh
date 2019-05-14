import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import NavBar from "../NavBar/NavBar.js";
import './Class.css'

class Class extends Component {

    constructor(props) {
      
        super(props);
        this.state = 
        {
            class:{
                name: props.name,
                location:props.location,
            }
        }
        console.log(props.name,"SHOZUL");
    }
        render(){
            return(
                <div>
                    <div id="rcorners">{this.state.name}</div>
                </div>
            )
        }
    
}
export default Class;