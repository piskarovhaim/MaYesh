import React, { Component } from "react";
import MobileForm from "./MobileForm";
import WebForm from "./WebForm.js"

class NewClass extends Component {

  render(){
    let web = true;
    if(window.innerWidth < 500)
      web = false;
    return(
      <div>
      {web ? <WebForm/> : <MobileForm/>}
      </div>
    )
  }

}

export default NewClass;