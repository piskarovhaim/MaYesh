import React, { Component } from 'react';
import Database from '../Firebase/FireBase.js';


class AllCategory extends Component {
    constructor(){
        super();
        this.state = {
            CategorysList: [],
            strCategorysList: " "
        };

        this.AllCategorys = this.AllCategorys.bind(this);
    }
    AllCategorys(){
        let arr=[];
        let str ="";
        let ref = Database.database().ref('/CategoryList/');
        ref.on('value', snapshot => {
          snapshot.forEach(child => {
              arr.push(child.val());
              str+= child.val().name + '\n';
            }); 
            console.log(arr,"list of the category objects on data base");
            this.setState({CategorysList:arr,strCategorysList:str});
        });
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