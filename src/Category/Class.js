import React, { Component } from "react";
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
    }
        render(){
            return(
                <div>
                    <div id="rcorners">{this.state.class.name}</div>
                </div>
            )
        }
    
}
export default Class;