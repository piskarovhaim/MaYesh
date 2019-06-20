import React, { Component } from "react";
import Class from "../Category/Class.js"
import './Category.css'
import NavBar from "../NavBar/NavBar"
import { Redirect } from "react-router";


class Category extends Component {

  constructor(props) {
    super(props);
    let redirect =false;
    if(props.location.state == undefined || props.location.state.category== undefined){
      redirect = true;
    }

    this.state = 
    {
        redirect:redirect,
        category:{
            classList: [],
            desc: '',
            img: '',
            likesCounter: '',
            name: '' 
        }
    }
  }
  componentDidMount(){
    if(this.props.location.state == undefined || this.props.location.state.category== undefined){
      return;
    }
    let tempClassList= [];
    if(this.props.location.state.category.classList != null)
      tempClassList = Object.values(this.props.location.state.category.classList);
    this.setState({
      category:{
        classList: tempClassList,
        desc: this.props.location.state.category.desc,
        img: this.props.location.state.category.img,
        likesCounter: this.props.location.state.category.likesCounter,
        name: this.props.location.state.category.name 
    }
    })
  }

  render() {
  let a = this.state.category.classList;
  //let a = this.state.category.classList.filter(item => item.isConfirmed);
  let gallery = a.map((element,i) =><Class key={i} name = {element.name} location={element.location} img = {element.imgUrl} categoryName = {this.state.category.name} date={element.date}/>)
  let style ={}
  if(window.innerWidth < 500){
      style.width = '93%';
      style.right = '2vw';
  } 
  if(this.state.redirect){
    return(
      <Redirect to='/'/>
    )
  }
  return (
       <div className="containerBox">
          <div className="categorycontentbackground">
              <div className="categorycontentbackgroundimage" style={{ 'background-image': `url(${this.state.category.img})` }}>
              <div className="categorycontentbackgroundshadow" />
              </div>
          </div>
          <NavBar/>
          <div className="catTextBox" style={style}>
              <div className="catText">
                   <span className="catTextPrimary">{this.state.category.name}</span>
                   <span className="catTextSub">{this.state.category.desc}</span>
              </div>
              <div  className = "galleryBox">
                    {gallery} 
              </div>
          </div>
       </div>
    )
  }
}

export default Category;
