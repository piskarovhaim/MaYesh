import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import "./AllCategory.css";
 
class AllCategory extends Component{

  state = {
    currentIndex: 0,
    responsive: { 500: { items: (window.innerWidth/150) },100: { items: 3 } },
    categoryList: [],
    webSite:false
  }
  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })
 
  componentWillMount() {
  
    let imgStyle;
    let web = false;
    if(window.innerWidth < 500)
      imgStyle = {height: 150,width: 150}
    else{
      let size = (window.innerWidth/5);
      imgStyle = {height: size ,width: size}
      web =true;
    }
    let arr = [];
    let i =0;
    let ref = firebase.database().ref('/CategoryList');
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
            arr.push(
            <div  className="gallery" key={i} onClick={()=>alert(child.val().name)}>
            <img style={imgStyle} src={child.val().img}/>
            </div>);
            i++;
        });

        this.setState({categoryList:arr,webSite:web});
    });
  }
 
  render() {
    let phone=false;
    if(this.state.windowWidth < 500)
      phone=true;
    return (
      <div className="AllCategory">
        <h1>All Category</h1>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          items={this.state.categoryList}
          responsive={this.state.responsive}
          slideToIndex={this.state.currentIndex}
          onSlideChanged={this.onSlideChanged}
        />
 
        {this.state.webSite ? (
        <div>
        <button onClick={() => this.slidePrev()}>Prev button</button>
        <button onClick={() => this.slideNext()}>Next button</button>
        </div>):(<div></div>)
        }
      </div>
    )
  }
}


export default AllCategory;