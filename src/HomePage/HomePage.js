import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import AllCategories from './AllCategories.js'
import './HomePage.css'
import Video from './Video.js'
import ClassBy from'./ClassBy.js';
import Contact from './Contact.js'

class HomePage extends Component {
  constructor(props) {
    super(props);
    let location = window.location.pathname
    if(location == "/Login")
        location = "/"
    this.state = {
      pageYOffset : 0
    };
    this.listenToScroll = this.listenToScroll.bind(this)
  }

  listenToScroll(){
    this.setState({pageYOffset:window.pageYOffset})
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.listenToScroll)
  }
  render() {
    let padding = 0;
    if(this.state.pageYOffset > (window.innerHeight/10))
      padding=10;
    return (   
          <div className="home" style={{paddingTop:padding+'vh'}}>
              <div className="navAndvideo">
                <NavBar homePage={true}/>
                <Video/>
                <div id="joinToClass" className="videogradient"/>
              </div>
                
                <ClassBy sortBy="thebestforme"/>
              <ClassBy sortBy="date"/>
              <AllCategories/>
              <div className="footer">
              <h2 style={{marginTop:'0'}}>קצת על נפגשים</h2>
              <p>
              אנחנו בנפגשים שמנו לעצמינו למטרה ליצור מקום מפגש לצעירות וצעירים ירושלמים שמאפשר לימוד, חוויה, תרבות, קהילה ויצירה משותפת. הדגש שלנו הוא על חיבור בין אנשים בעלי תחומי עניין משותפים באמצעות הצטרפות או יצירה של חוג שיהווה מסגרת חברתית ואינטלקטואלית
                </p>
              </div>
              <div className="footer">
              <h2>קצת על הישיבה החילונית בירושלים</h2>
              <p>
              אנחנו מאמינים בתרבות יהודית וישראלית עשירה ומלאה בהשראה בירושלים כעיר מגוונת ופתוחה לכולם וביצירת קהילה צעירה שייכת לכאן ולעכשיו, נענית לאתגרי השעה ולוקחת חלק בבניין העתיד של התרבות היהודית והישראלית
              </p>
               </div>
          </div>
        
     
    );
  }
}

export default HomePage;
