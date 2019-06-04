import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import '../Login/FormStyle.css'


class ContactForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          name:'',
          email:'',
          message:''  
      }
      this.handleChange = this.handleChange.bind(this);
      this.sendMassage = this.sendMassage.bind(this);
    }

    handleChange(e) {
          this.setState({[e.target.name]: e.target.value});
      }
    
    sendMassage(){
        let data = this.state;
        firebase.database().ref('/Messages').push(data);
        alert("ההודעה נשלחה למערכת תקבל מענה בהקדם");
        this.setState({name:'',email:'',message:''})
    }
    render(){

        return(
        <div className="completeReg">
        <form>
        <b>
        פנייה לאתר
       </b>
       <br/><br/>  
        <label>
        שם
        <input type="text" value={this.state.name} required name="name" onChange={this.handleChange} />
        </label>
        <label>
        אימייל
        <input type="email" value={this.state.email} required name="email" onChange={this.handleChange} />
        </label>
        <label>
        הודעה
        <textarea name="message" value={this.state.message} required onChange={this.handleChange} />
        </label>
        <input className="registerbtn" type="button" value="שלח" onClick={this.sendMassage}/>
       </form>
       </div>
        )
    }

}

export default ContactForm;