import React, { Component } from 'react';
import firebase from './FireBase.js';


class DB extends Component {
  
    constructor(){
        super();

      this.AddCategory = this.AddCategory.bind(this);
    }

AddCategory(name){
    firebase.database().ref('/CategoryList/' + name).set("");
    alert("saved");
}
  render() {
    return (
          <h1>MaYesh</h1>
    );
  }

}

export default DB;