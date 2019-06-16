import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import { BrowserRouter as Router, Link } from "react-router-dom";
import NetflixSlider from "../NetflixSlider/NetflixSlider.js";

function ClassElement(props) {
      let oneclass = props.class;
      let date = new Date(oneclass.date);
      if(oneclass.imgUrl == undefined){
        oneclass.imgUrl = "data:image/jpeg;base64,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"
      }
      let style;
      let size;
      if(window.innerWidth < 500) // set the image size by phone or not phone
        size = (window.innerWidth-40)/3
      else{
        size = (window.innerWidth/7);
      }
      style = {height: size ,width: size}
      return(
        <div className="gallery" style={style}>
        <img src={oneclass.imgUrl} className="AllCategories" style={style}/>
        <div className="textdiv">
            {oneclass.name}
            <br/>
            {date.toLocaleDateString('en-GB')}
        </div>
        </div>
      )
}

class ShowClass extends Component{
    constructor(props){
      super(props)
      this.state={
        elements:[],
        classList:props.classList,
        favoriteCat:props.favoriteCat,
        currentIndex: 1,
        responsive: { 500: { items: (window.innerWidth/180) },0: { items: 3 } },
        sortBy: props.sortBy,
        title:""
      }

      this.byDate = this.byDate.bind(this);
      this.byBestForMe = this.byBestForMe.bind(this);
      this.updateWindows = this.updateWindows.bind(this)
    }

    updateWindows(){
      this.setState({responsive: { 500: { items: (window.innerWidth/180) },0: { items: 3 } },})
    }

    componentWillUnmount(){
      window.removeEventListener("resize", this.updateWindows);
    }

    componentDidMount(){
      window.addEventListener("resize", this.updateWindows);
      let listTosort = this.state.classList;
      let title;
          switch(this.state.sortBy) {
              case 'date':
                  listTosort.sort(this.byDate);
                  title = "הקרובים ביותר";
                  break;
              case 'thebestforme':
                  listTosort.sort(this.byBestForMe);
                  listTosort.sort(this.byDate);
                  listTosort.sort(this.byBestForMe);
                  title = "המומלצים עבורך"
                  break;
              default:
          }
      let elements =[];
      listTosort.forEach(i =>{ // set the elemenet in the "Carousel gallery"
          elements.push(
          <Link to={"/Category/"+ i.category +"/Class/"+i.name}>
          <ClassElement class={i}/>
          </Link>
          )})
      this.setState({elements:elements,title:title})
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
  
    byBestForMe(s1,s2){
      if(this.state.favoriteCat.includes(s1.category))
          return -1;
      return 1;
    }

    render(){
      let web = false;
      if(window.innerWidth > 500) // set the image size by phone or not phone
        web =true;
      return(

        <NetflixSlider classList={this.state.classList}/>
 
      )
    }
}

class ClassBy extends Component{

    constructor(props){
        super(props)
        this.state = {
            sortBy: props.sortBy,
            allClasses:[],
            user:{},
            favoriteCat:[],
            readClasses:false,
            readFavoriteCat:false
          }

    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
      if(user){
      let ref = firebase.database().ref('/Users/');
      ref.child(firebase.auth().currentUser.uid).once("value", snapshot => {
        if(snapshot.val() !== undefined && snapshot.val() !== null && snapshot.val().favoriteCat !== null && snapshot.val().favoriteCat !== undefined)
            this.setState({user:snapshot.val(),favoriteCat:Object.values(snapshot.val().favoriteCat),readFavoriteCat:true})
        else
            this.setState({readFavoriteCat:true})
      });
    }
    else{
      this.setState({readFavoriteCat:true})
    }
  })
    let ref = firebase.database().ref('/CategoryList');
    ref.on('value', snapshot => {
      let time = new Date(Date.now())
      let arrTempAllClasses = [];
      snapshot.forEach(child => {
            let temp = child.val().classList;
            for (let key in temp) {
                let classTime = new Date(temp[key].date)
                if(time > classTime || isNaN(classTime)){
                    if(temp[key].isConfirmed){
                      temp[key].isConfirmed =false;
                      firebase.database().ref('/CategoryList/' + temp[key].category + "/classList/" + temp[key].name).update(temp[key]);
                    }
                }
                if(temp[key].isConfirmed)
                  arrTempAllClasses.push(temp[key]);
              }
        });
        this.setState({allClasses:arrTempAllClasses,readClasses:true})
    });
  }

  render() {
    let show = false;
    if(this.state.readClasses && this.state.readFavoriteCat)
        show= true;
    return (
      <div>
      {show ? 
      <ShowClass classList={this.state.allClasses} favoriteCat={this.state.favoriteCat} sortBy={this.state.sortBy} />
    : null}   
       </div>
    )    
  }
}


export default ClassBy;