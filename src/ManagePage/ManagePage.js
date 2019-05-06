import React, { Component } from 'react';
import Database from '../Firebase/DataBase.js';
import AddCategory from './AddCategory.js'
import AllCategory from './AllCategory.js'


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

    

  }

  render() {
    return (
        <div>
          <AddCategory/>
       <br/>
        <AllCategory/>
       </div>
      );
  }

}

export default ManagePage;