import React, { Component } from "react";
 
class Test extends Component{


    constructor(props){
        super(props)
        this.state = {
            name: props.name
          }
          
    }


  render() {
     
    return (
      <div>
            <h1>hii {this.state.name}
      </h1>
      </div>
    )
  }
}


export default Test;