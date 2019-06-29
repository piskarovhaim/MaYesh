import React, { Component } from "react";
import Class from "../Category/Class.js"
import './Category.css'
import '../Class/Class.css'
import NavBar from "../NavBar/NavBar"
import { Redirect } from "react-router";
import { Link } from 'react-router-dom'

/*
    Category page - show all data about specific category:
     name , description , image , all classes that confirmed
*/
class Category extends Component {

  constructor(props) {
    super(props);
    let redirect =false; // if some error in props => redirect to the main page
    if(props.location.state == undefined || props.location.state.category== undefined){
      redirect = true;
    }

    this.state = 
    {
        redirect:redirect,
        windowH:window.innerHeight,
        category:{
            classList: [],
            desc: '',
            img: '',
            likesCounter: '',
            name: '' 
        }
    }
    this.updateWindows = this.updateWindows.bind(this)
  }

  updateWindows(){
    this.setState({windowH:window.innerHeight})
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWindows);
  }
  componentDidMount(){
    window.addEventListener("resize", this.updateWindows);
    // if some error in props => redirect to the main page
    if(this.props.location.state == undefined || this.props.location.state.category== undefined){
      return;
    }

    let tempClassList= []; // read all class list from ths props
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
  //let a = this.state.category.classList;

  // filter the classes that confirmed
  let a = this.state.category.classList.filter(item => item.isConfirmed);
  // map the classes to gallery object
  let gallery = a.map((element,i) =><Class key={i} name = {element.name} location={element.location} img = {element.imgUrl} categoryName = {this.state.category.name} date={element.date}/>)
  if(gallery.length==0)
    gallery = "אין כרגע חוגים מתאימים בקטגוריה זו";
  let style ={}
  let styleBox = {}
  // resize if it run on phonescreen
  if(window.innerWidth < 500){
      style.width = '93%';
      style.right = '2vw';
      style.maxHeight = (window.innerHeight/100)*84;
      styleBox.height = window.innerHeight;
  } 
  if(this.state.redirect){ // if some error in props => redirect to the main page
    return(
      <Redirect to='/'/>
    )
  }
  return (
       <div className="containerBox" style={styleBox}>
          <div className="categorycontentbackground">
              <div className="categorycontentbackgroundimage" style={{ 'background-image': `url(${this.state.category.img})` }}>
              <div className="categorycontentbackgroundshadow" />
              </div>
          </div>
          <NavBar/>
          <Link to = "/" className="linkto">
                                  <div className="backbut">
                                      <span className="iconCont">
                                            <svg className="backSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                <title>arrow-left2</title>
                                                <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
                                            </svg>
                                        </span></div>
                            </Link>
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
