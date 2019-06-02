import React, { Component } from 'react';
import firebase from '../Firebase/FireBase.js';
import '../Login/FormStyle.css'

class AddCategory extends Component {
    constructor(){
        super();
        this.state = {
        addCategory:{
            name: "",
            classList:new Array(),
            img: "",
            desc: "",
            likesCounter: 0

            }
        };

        this.AddCategory = this.AddCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    AddCategory() {
        firebase.database().ref('/CategoryList/' + this.state.addCategory.name).set(this.state.addCategory);
    }
    handleChange(event) {
        let temp = this.state.addCategory;
        let name = event.target.name;
        switch(name) {
            case 'name':
                temp.name = event.target.value;
                break;
            case 'img':
                temp.img = event.target.value;
                break;
            case 'desc':
                temp.desc = event.target.value;
                break;
            default:
          }
        this.setState({addCategory: temp});
      }

      render(){

        return (
        <div className="completeReg" style={{margin:15,float:'right',borderLeft:'1px solid black'}}>
        <form onSubmit={this.AddCategory}>
        <b>
        :הוספת קטגוריה חדשה
       </b>
       <br/><br/>  
        <label>
        שם
        <input type="text" required name="name" onChange={this.handleChange} />
        </label>
        <label>
        קישור להתמונה
        <input type="text" name="img" onChange={this.handleChange} />
        </label>
        <label>
        תיאור
        <input type="text" name="desc" onChange={this.handleChange} />
        </label>
        <input className="registerbtn" type="submit" value="שמור" />
       </form>
       </div>
        );
      };
      
}

export default AddCategory;