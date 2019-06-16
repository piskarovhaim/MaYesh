import React, { Component } from 'react';
import AddCategory from './AddCategory.js'
import firebase from "../Firebase/FireBase.js";
import './MainManagePage.css'
import { BrowserRouter as Router, Link } from "react-router-dom";
import '../Login/FormStyle.css'
import Permissions from './Permissions.js';
import Search from '../NavBar/Search.js'

function AllCategory(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;

  return (
    <div className="manageAllCategory">
      <h1> ניהול הקטגוריות</h1>
        {categories.map((object, i) => {
          let str = "/manage/" + object.name;
          return (
            <div className="manageCat" key={i}>
            <Link to={str}>
            <img className="imgmanageCat" src={object.img}/>
            <div className="textdivmanage" style={{padding:'4px'}}>
            {object.name}
            </div>
            </Link>
            </div>
          );
        })}
        </div>
  );
}

function Messages(props){
  let messages = props.messages;
  return(
    <div className="messages">
      <h1>פניות ממשתמשים</h1>
          {messages.map((object, i) => {
          return (
            <div className="message" key={i}>
                <h4>{object.name} :שם</h4>
                <h4>{object.email} :איימיל</h4>
                <h4>{object.message} :הודעה</h4>
                <h3 style={{color:'red',cursor: 'pointer'}} onClick={()=>props.del(object.key)}>מחק</h3>
            </div>
          );
        })}
        {messages.length > 0 ? <h3 style={{color:'red',cursor: 'pointer'}} onClick={()=>props.delAll()}>מחק הכל</h3>:null}
      </div>
  )
}

function ClassWaitToConfirme(props) {

  let classes = props.classes;
  return(
    <div className="ClassWaitToConfirme">
      <h1> חוגים חדשים הממתינים לאישור</h1>
          {classes.map((object, i) => {
          return (
            <div className="manageCat" key={i}>
            <Link to={"/ManageClass/"+ object.category +"/"+object.name}>
            <img className="imgmanageCat" src={object.imgUrl}/>
            <div className="textdivmanage" style={{padding:'4px'}}>
            {object.name}
            </div>
            </Link>
            </div>
          );
        })}
    </div>
  )
}

function OldClass(props) {

  let classes = props.classes;
  return(
    <div className="ClassWaitToConfirme">
      <h1> חוגים ישנים</h1>
          {classes.map((object, i) => {
          return (
            <div className="manageCat" key={i}>
            <Link to={"/ManageClass/"+ object.category +"/"+object.name}>
            <img className="imgmanageCat" src={object.imgUrl}/>
            <div className="textdivmanage" style={{padding:'4px'}}>
            {object.name}
            </div>
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
        showCategorysList:true,
        CategorysList:[],
        showClasses:false,
        ClassWaitToConfirme:[],
        OldClass:[],
        showMessages:false,
        Messages:[],
        navStyle: {
          height: window.innerHeight / 10
        }
        
    };

  }


  componentDidMount(){

    let ref = firebase.database().ref('/CategoryList/');
    ref.on('value', snapshot => {
      let arr=[];
      let arrTempWaitClasses = [];
      let arrTempOldClasses = [];
      let time = new Date(Date.now())
      snapshot.forEach(child => {
          arr.push(child.val());
          let temp = child.val().classList;
            for (let key in temp) {
              let classTime = new Date(temp[key].date)
              if(time > classTime || isNaN(classTime))
                  arrTempOldClasses.push(temp[key])
              else if(!temp[key].isConfirmed)
                  arrTempWaitClasses.push(temp[key]);
            }
        }); 
        this.setState({CategorysList:arr,ClassWaitToConfirme:arrTempWaitClasses,OldClass:arrTempOldClasses});
    });
  
    
    firebase.database().ref('/Messages').on("value", snapshot => {
      let tempMessages=[];
      snapshot.forEach(element => {
        let itemVal = element.val();
        itemVal.key = element.key;
        tempMessages.push(itemVal);
      });
      this.setState({Massages:tempMessages})
    });;
  }

  deleteMessage(key){
      firebase.database().ref('Messages').child(key).remove();
  }
  deleteAllMessage(){
    firebase.database().ref('Messages').remove();
}

  render() {
    const setNavHeight = {
      height: this.state.navStyle.height
    };  
    return (
        <div style={{display: 'block'}}>
        <Permissions/>
        <div className="managenav" style={setNavHeight}>
          <Link to="/"><img className="logo" src="https://firebasestorage.googleapis.com/v0/b/mayesh-bd07f.appspot.com/o/imgs%2Flogo.jpg?alt=media&token=cae07f5d-0006-42c8-8c16-c557c1ea176c"/></Link>
          <div style={{display:'-webkit-inline-box',paddingLeft:'15px',color:'black'}}>
          <Search manage={true}/>
          </div>
        <div className="managenavbarinline">
        
              <div className="managenavText" onClick={()=>this.setState({showCategorysList:true,showClasses:false,showMessages:false,showOldClasses:false})}>ניהול קטגוריות</div>
              <div className="managenavText" onClick={()=>this.setState({showCategorysList:false,showClasses:false,showMessages:true,showOldClasses:false})}>פניות ממשתמשים</div>
              <div className="managenavText" onClick={()=>this.setState({showCategorysList:false,showClasses:true,showMessages:false,showOldClasses:false})}>חוגים הממתינים לאישור</div>
              <div className="managenavText" onClick={()=>this.setState({showCategorysList:false,showClasses:false,showMessages:false,showOldClasses:true})}>חוגים ישנים</div>
            </div>
            
      </div>
          <hr/>
          {this.state.showCategorysList ? (
            <div>
          <AddCategory/>
          <AllCategory categories={this.state.CategorysList}/>
          </div>
          ):null}
          
          {this.state.showMessages ? <Messages messages={this.state.Massages} del={this.deleteMessage} delAll={this.deleteAllMessage}/> : null}  
          {this.state.showClasses ? <ClassWaitToConfirme classes={this.state.ClassWaitToConfirme}/>:null}
          {this.state.showOldClasses ? <OldClass classes={this.state.OldClass}/>:null}
          
       </div>
      );
  }

}

export default MainManagePage;