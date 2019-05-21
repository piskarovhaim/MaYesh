import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import Class from "../Category/Class.js"

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
    let temp = this.state.category;
    let cat = firebase.database().ref('CategoryList/' + 'Yuga');
    cat.on('value' ,snapshot => {
      let obj = snapshot.val().classList;
      let classArr = Object.values(obj)
      temp.likesCounter = snapshot.val().likesCounter
      temp.classList = classArr
      temp.img = snapshot.val().img
      temp.desc = snapshot.val().desc
      this.setState({category:temp})
    })
    
  }

  render() {
  let a = this.state.category.classList;
  let gallery = a.map(element =><Class name = {element.name} />)
  let styleImg = 
  {
    backgroundImage : 'url('+this.state.category.img+')', 
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    height: 250,
    
  }
   
    return (
      <div className="gallery-container">
        <div style = {styleImg}>
          <h1> {this.state.category.desc} </h1>
        </div>  
        <div className = "model">
        </div>
        <div  className = "gallery-grid">
             {gallery} 
        </div>
            
      </div>
    )
  }
}

export default Category;
