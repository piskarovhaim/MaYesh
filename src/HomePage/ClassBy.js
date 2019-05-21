import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import "./ClassBy.css";


class ClassBy extends Component{

    constructor(props){
        super(props)
        this.state = {
            currentIndex: 0,
            responsive: { 500: { items: (window.innerWidth/150) },0: { items: 3 } },
            classList: [],
            webSite:false,
            sortBy: props.sortBy,
            title: " "
          }
          this.byDate = this.byDate.bind(this);
    }

  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })

  byDate(s1,s2){ // sort function by Date, newest first
    if(isNaN(new Date(s1.date)))
        return 1;
    if(isNaN(new Date(s2.date)))
        return -1
    return new Date(s1.date) - new Date(s2.date);}

    componentDidMount() {
  
    let web = false;
    if(window.innerWidth > 500) // set the image size by phone or not phone
      web =true;
      
    let arrTempAllClasses = [];
    let ref = firebase.database().ref('/CategoryList');
    ref.on('value', snapshot => {
      snapshot.forEach(child => {
            let temp = child.val().classList;
            console.log(temp);
            for (let key in temp) {
                arrTempAllClasses.push(temp[key]);
              }
        });
        let title;
        switch(this.state.sortBy) {
            case 'date':
                arrTempAllClasses.sort(this.byDate);
                title = "Coming Soon";
                break;
            case 'popolar':
                break;
            default:
        }
    
        let elements =[]
        arrTempAllClasses.forEach(i =>{ // set the elemenet in the "Carousel gallery"
            elements.push(<div>{i.name}<br/>{i.date}</div>);
        })

        this.setState({classList:elements,webSite:web,title:title});
    });
  }
 
  render() {
    return (
      <div className="AllCategories">
        <h1>{this.state.title}</h1>

        <AliceCarousel // the component that show the "Carousel" of the all Categories
          dotsDisabled={true}
          buttonsDisabled={true}
          items={this.state.classList}
          responsive={this.state.responsive}
          slideToIndex={this.state.currentIndex}
          onSlideChanged={this.onSlideChanged}
        />
 
        {this.state.webSite ? (  // if open in phone show the buttons , else dont show
        <div className="carouselButton">
        <button className="carouselButton" onClick={() => this.slidePrev()}>&lt;</button>
        <button className="carouselButton" onClick={() => this.slideNext()}>&gt;</button>
        </div>):null}
       </div>
    )
  }
}


export default ClassBy;