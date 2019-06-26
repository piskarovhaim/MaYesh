import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import "./Contact.css";
import Alert from "react-s-alert";

class Contact extends Component {
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
      Alert.success("ההודעה נשלחה למערכת תקבל מענה בהקדם");
      this.setState({name:'',email:'',message:''})
  }
      render() {
        let phoneW = {};
        if(window.innerWidth < 500)
            phoneW.width = '90vw'
          return(
            <div className="contact">
                <input type="checkbox" className="contCB" id="butTog"/>
                <label for="butTog" className="contButt">
                  <span className="navIconUP">&nbsp;</span>
                  <span className="navIconDown">&nbsp;</span>
                  <span className="navIconRight">&nbsp;</span>
                  <span className="navIconLeft">&nbsp;</span>
                  <span className="navIconLeshRight">&nbsp;</span>
                  <span className="navIconLeshLeft">&nbsp;</span>
                </label>

              <div className="contBG">
                <h1 className="headLine">צור קשר</h1>
                  <div className="contBoxdiv" style={phoneW}>
                  <form className="contBox" onSubmit={this.sendMassage}>
                        <input name="name" value={this.state.name} type="text" placeholder ="הכנס שם מלא" required onChange={this.handleChange}/><br/>
                        <input name="email" value={this.state.email} type="email"  placeholder = "הכנס כתובת דואר אלקטרוני" required onChange={this.handleChange}/><br/>
                        <textarea name="message" value={this.state.message}  placeholder="הכנס הודעתך" row="4" required onChange={this.handleChange}/><br/>
                        <input type="submit" value="שלח הודעה"/>
                    </form>
                    </div>
              </div>
            </div>
      );
}
}


export default Contact;
