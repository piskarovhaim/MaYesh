import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import "./AllCategory.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Test from './test.js'
 
class AllCategory extends Component{

  state = {
    currentIndex: 0,
    responsive: { 500: { items: (window.innerWidth/150) },100: { items: 3 } },
    categoryList: [],
    webSite:false,
    currentCategory:""
  }
  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })
 
  componentWillMount() {
  
    let imgStyle;
    let web = false;
    let size
    if(window.innerWidth < 500)
      size = (window.innerWidth-40)/3
    else{
      size = (window.innerWidth/7);
      web =true;
    }
    imgStyle = {height: size ,width: size}
    let arr = [];
    let i =0;
    let ref = firebase.database().ref('/CategoryList');
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
            let str = "/Category/" + child.val().name;
            arr.push(
            <Link to={str}><div className="gallery" key={i}>
            <img style={imgStyle} src={child.val().img}/>
            </div>
            </Link>);
            i++;
        });

        this.setState({categoryList:arr,webSite:web});
    });
  }
 
  render() {

    const addHeight = {
        height: window.innerHeight/1.3,
        borber: '1px'
      }
    return (
      <div className="AllCategory">
      <Route path="/Category/:name" exact render={({match}) => {return <Test name={match.params.name}/>;}}/>
      <Route path="/" exact render={() => {return (
        <div>
        <h1>All Categorys</h1>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          items={this.state.categoryList}
          responsive={this.state.responsive}
          slideToIndex={this.state.currentIndex}
          onSlideChanged={this.onSlideChanged}
        />
 
        {this.state.webSite ? (
        <div className="carouselButton">
        <button className="carouselButton" onClick={() => this.slidePrev()}>&lt;</button>
        <button className="carouselButton" onClick={() => this.slideNext()}>&gt;</button>
        </div>):(<div></div>)
        }
        </div>
      );}}/>
       </div>
    )
  }
}


export default AllCategory;