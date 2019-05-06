import React, { Component } from 'react';
import Database from '../Firebase/DataBase.js';


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
        const DB = new Database();
        DB.AddCategory(this.state.addCategory);
    }
    handleChange(event) {
        let temp = this.state.addCategory;
        let name = event.target.name;
        switch(name) {
            case 'name':
                temp.name = event.target.value;
            case 'img':
                temp.img = event.target.value;
            case 'desc':
                temp.desc = event.target.value;
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