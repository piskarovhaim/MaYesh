import React, { Component } from 'react';
import firebase from '../Firebase/FireBase.js';


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
        <div>
        Add Category
        <br/>
        <label>
        name:
        <input type="text" name="name" onChange={this.handleChange} />
        </label>
        <br/>
        <label>
        img:
        <input type="text" name="img" onChange={this.handleChange} />
        </label>
        <br/>
        <label>
        desc:
        <input type="text" name="desc" onChange={this.handleChange} />
        </label>
        <br/>
       <button onClick={this.AddCategory}>Add</button>
       </div>
        );
      };
      
}

export default AddCategory;