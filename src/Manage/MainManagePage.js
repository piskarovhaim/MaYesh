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

function ClassWaitToConfirme(props) {

  let classes = props.classes;
  return(
    <div className="ClassWaitToConfirme">
      <hr/>
      <h1> קורסים חדשים הממתינים לאישור</h1>
          {classes.map((object, i) => {
          return (
            <div className="manageCat" key={i}>
            <Link to={"/Category/"+ object.category +"/Class/"+object.name}>
            <img className="imgmanageCat" src={object.imgUrl}/>
            </Link>
            </div>
          );
        })}
    </div>
  )
}

class MainManagePage extends Component {
  
  
  constructor(props) {
    super(props);
    this.state = {
        CategorysList:[],
        showClasses:false,
        ClassWaitToConfirme:[]
    };

  }

  componentDidMount(){
    let arr=[];
    let arrTempClasses = [];
    let ref = firebase.database().ref('/CategoryList/');
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
          arr.push(child.val());
          let temp = child.val().classList;
            for (let key in temp) {
                if(!temp[key].isConfirmed)
                    arrTempClasses.push(temp[key]);
              }
        }); 
        this.setState({CategorysList:arr,ClassWaitToConfirme:arrTempClasses});
    });
  }

  render() {
    console.log(this.state.ClassWaitToConfirme);
    return (
        <div style={{display: 'block'}}>
          <AddCategory/>
          <div className="manageAllCategory">
          <AllCategory categories={this.state.CategorysList}/>
          </div>
          <div style={{width:'100%',display:'inline-block'}}>
            <div style={{width:'50%',margin:'auto'}}>
                
                {this.state.showClasses ? <ClassWaitToConfirme classes={this.state.ClassWaitToConfirme}/>:<p style={{fontFamily: 'Arial, Helvetica, sans-serif',cursor: 'pointer'}} onClick={()=>this.setState({showClasses:true})}> הצג את כל הקורסים שממתינים לאישור</p>}
            </div>
          </div>
       </div>
      );
  }

}

export default MainManagePage;