import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import Class from "../Category/Class.js"
import { elementType } from "prop-types";



class Category extends Component {

  constructor(props) {
      
    super(props);
    this.state = 
    {
        category:{
            classList: [],
            desc: "",
            img: "",
            likesCounter: "",
            name: props.name 
        }
    }
  }
  componentDidMount(){
    let classArr;
    let temp = this.state.category;
    let cat = firebase.database().ref('CategoryList/' + this.state.category.name);
    cat.on('value' ,snapshot => {
      let obj = snapshot.val().classList;
      if(obj == null)
        classArr = [] ;
      else
        classArr = Object.values(obj)

      temp.likesCounter = snapshot.val().likesCounter
      temp.classList = classArr
      temp.img = snapshot.val().img
      temp.desc = snapshot.val().desc
      this.setState({category:temp})
    })
    
  }
  render() {
  let a = this.state.category.classList;
  let gallery = a.map((element,i) =><Class key={i} name = {element.name} location={element.location} img = {element.imgUrl} categoryName = {this.state.category.name} />)
  let styleImg = 
  {
    backgroundImage : 'url('+this.state.category.img+')', 
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    minWidth:100+'%',
    minHight:100+'%',
  }
  let type
  if(window.innerWidth < 500)
  {
    type = "phoneCategory"
  }
  else
  {
    type = "pcCategory"
  }
    return (
      <div className="gallery-container">
        <div className = "video" style = {styleImg}>
          <h1> {this.state.category.name} </h1>
        </div>  
        <div  className = {type}>
             {gallery} 
        </div>
            
      </div>
    )
  }
}

export default Category;
