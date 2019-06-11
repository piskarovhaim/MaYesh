import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import firebase from "../Firebase/FireBase.js";
import "./AllCategories.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

class AllCategories extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentIndex: 0,
      responsive: { 500: { items: window.innerWidth / 180 }, 0: { items: 3 } },
      categoryList: [],
      webSite: false
    };
    this.updateWindows = this.updateWindows.bind(this)
  }

  updateWindows(){
    console.log(window.innerWidth);
    this.setState({responsive: { 500: { items: (window.innerWidth/180) },0: { items: 3 } },})
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.updateWindows);
  }

  slideTo = i => this.setState({ currentIndex: i });

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  slideNext = () =>
    this.setState({ currentIndex: this.state.currentIndex + 1 });

  slidePrev = () =>
    this.setState({ currentIndex: this.state.currentIndex - 1 });

  componentDidMount() {
    window.addEventListener("resize", this.updateWindows);
    let imgStyle;
    let web = false;
    let size;
    if (window.innerWidth < 500)
      // set the image size by phone or not phone
      size = (window.innerWidth - 40) / 3;
    else {
      size = window.innerWidth / 7;
      web = true;
    }
    imgStyle = { height: size, width: size };
    
    
    let ref = firebase.database().ref("/CategoryList");
    ref.on("value", snapshot => {
      let i = 0;
      let arrTemp = [];
      snapshot.forEach(child => {
            let str = "/Category/" + child.val().name;
            arrTemp.push( // One element in displaying all categories
              <div className="gallery" key={i} style={imgStyle}>
            <Link to={str}>
            <img alt={child.val().name} className="AllCategories" style={imgStyle} src={child.val().img}/>
            <div className="textdiv" style={{padding:'4px'}}>
            {child.val().name}
            </div>
            </Link>
          </div>
        );
        i++;
      });
      this.setState({ categoryList: arrTemp, webSite: web });
    });
  }

  render() {
    let web = false;
    if(window.innerWidth > 500) // set the image size by phone or not phone
      web =true;
    return (
      <div className="AllCategories">

        {web ? (  // if open in phone show the buttons , else dont show
        <div>
        <div className="carouselButtondivL">
        <button className="carouselButton" onClick={() => this.slidePrev()}>&lsaquo;</button>
        </div><div className="carouselButtondivR">
        <button className="carouselButton" onClick={() => this.slideNext()}>&rsaquo;</button>
        </div></div>):null} 

        <h1>כל הקטגוריות</h1>
        <AliceCarousel // the component that show the "Carousel" of the all Categories
          dotsDisabled={true}
          buttonsDisabled={true}
          items={this.state.categoryList}
          responsive={this.state.responsive}
          slideToIndex={this.state.currentIndex}
          onSlideChanged={this.onSlideChanged}
        /> 
       </div>
    )
  }
}

export default AllCategories;
