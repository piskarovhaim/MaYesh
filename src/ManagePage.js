import React, { Component } from 'react';
import Database from './Firebase/DataBase.js';


class ManagePage extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
        addCategory:{
            name: "",
            classList:new Array(),
            img: "",
            desc: "",
            likesCounter: 0

        },
        CategorysList: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.AddCategory = this.AddCategory.bind(this);
    this.ShowCategory = this.ShowCategory.bind(this);

  }
  

  AddCategory() {
    const DB = new Database();
    DB.AddCategory(this.state.addCategory);
  }
  ShowCategory(){
    const DB = new Database();
    console.log(DB.AllCategorys());
    let str = "";
    DB.AllCategorys().forEach(element => { 
        str+= element.name + "\n"
    });
    this.setState({CategorysList:str})

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

  render() {
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
       <br/>
       <button onClick={this.ShowCategory}>show all categorys</button>
       <div id="allCat">
       {this.state.CategorysList}
       </div>
       </div>
      );
  }

}

export default ManagePage;