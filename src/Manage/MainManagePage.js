import React, { Component } from 'react';
import AddCategory from './AddCategory.js'
import firebase from "../Firebase/FireBase.js";
import './MainManagePage.css'
import { BrowserRouter as Router, Link } from "react-router-dom";
import '../Login/FormStyle.css'

function AllCategory(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;

  return (
      <div>
      <h1> ניהול הקטגוריות</h1>
        {categories.map((object, i) => {
          let str = "/manage/" + object.name;
          return (
            <div className="manageCat" key={i}>
            <Link to={str}>
            <img className="imgmanageCat" src={object.img}/>
            </Link>
            </div>
          );
        })}
        </div>
  );
}

class MainManagePage extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
        CategorysList:[]
    };



  }

  componentDidMount(){
    let arr=[];
    let ref = firebase.database().ref('/CategoryList/');
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
          arr.push(child.val());
        }); 
        this.setState({CategorysList:arr});
    });
  }

  render() {
    return (
        <div style={{display: 'block'}}>
          <AddCategory/>
          <div className="manageAllCategory">
          <AllCategory categories={this.state.CategorysList}/>
          </div>
          <div style={{width:'100%',display:'inline-block'}}>
            <div style={{width:'50%',margin:'auto'}}>
                <h3 style={{fontFamily: 'Arial, Helvetica, sans-serif'}}> הצג את כל הקורסים שממתינים לאישור</h3>
            </div>
          </div>
       </div>
      );
  }

}

export default MainManagePage;