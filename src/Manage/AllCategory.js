import React, { Component } from 'react';
import Database from '../Firebase/FireBase.js';


class AllCategory extends Component {
    constructor(){
        super();
        this.state = {
            CategorysList: [],
        };

        this.AllCategorys = this.AllCategorys.bind(this);
    }
    componentDidMount(){

    }
      render(){

        return (
        <div>
       <button onClick={this.AllCategorys}>show all categorys</button>
       {this.state.strCategorysList}
       </div>
        );
      };
      
}

export default AllCategory;