import React, { Component } from "react";
import "react-alice-carousel/lib/alice-carousel.css"
import firebase from "../Firebase/FireBase.js";
import NetflixSlider from "../NetflixSlider/NetflixSlider.js";
import './HomePage.css'

class ShowClass extends Component{
    constructor(props){
      super(props)
      this.state={
        classList:props.classList,
        favoriteCat:props.favoriteCat,
        sortBy: props.sortBy,
        title:""
      }

      this.byDate = this.byDate.bind(this);
      this.byBestForMe = this.byBestForMe.bind(this);
      this.updateWindows = this.updateWindows.bind(this)
    }

    updateWindows(){
      this.setState({})
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
                  title = "החוגים הקרובים";
                  break;
              case 'thebestforme':
                  listTosort.sort(this.byBestForMe);
                  listTosort.sort(this.byDate);
                  listTosort.sort(this.byBestForMe);
                  title = "מומלצים עבורך"
                  break;
              default:
          }
      this.setState({classList:listTosort,title:title})
  }

  byDate(s1,s2){ // sort function by Date, newest first
      if(isNaN(new Date(s1.date)))
          return 1;
      if(isNaN(new Date(s2.date)))
          return -1
      return new Date(s1.date) - new Date(s2.date);
  }
  
  byBestForMe(s1,s2){
      if(this.state.favoriteCat.includes(s1.category))
          return -1;
      return 1;
  }

    render(){
      return(
        <div>
        <div className="titleClassesBy">{this.state.title}</div>
        <NetflixSlider classList={this.state.classList}/>
        </div>
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