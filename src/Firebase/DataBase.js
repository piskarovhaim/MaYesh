import React, { Component } from 'react';
import firebase from './FireBase.js';


class DB extends Component {
  
    constructor(){
        super();

        this.AddCategory = this.AddCategory.bind(this);
        this.AllCategorys = this.AllCategorys.bind(this);
    }

AddCategory(cat){
    firebase.database().ref('/CategoryList/' + cat.name).set(cat);
    alert("saved");
}

AllCategorys(){
  let arr=[];
  let ref = firebase.database().ref('/CategoryList/');
  ref.on('value', snapshot => {
    snapshot.forEach(child => {
        arr.push(child.val());
      });
  });
  return arr;
}

  render() {
    return (
          <h1>MaYesh</h1>
    );
  }

}


export default DB;