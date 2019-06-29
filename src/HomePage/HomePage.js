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
      windowH:window.innerHeight,
      pageYOffset : 0
    };

  }

componentWillUnmount(){
    window.removeEventListener("scroll", ()=>this.setState({}));
}
componentDidMount(){
    window.addEventListener("scroll", ()=>this.setState({}));
}

  render() {
    return (   
          <div className="home">
              <div className="navAndvideo">
                <NavBar about={true}/>
                <NavBar homePage={true}/>
                <Contact/>
                <Video/>
                <div id="joinToClass" className="videogradient"/>
              </div>
                
              <ClassBy sortBy="thebestforme"/>
              <ClassBy sortBy="date"/>
              <AllCategories/>
              <div className="footer" id="About">
              <h2 style={{marginTop:'0'}}>קצת על מה יש</h2>
              <p>
              אנחנו בMaYesh שמנו לעצמינו למטרה ליצור מקום מפגש לצעירות וצעירים ירושלמים שמאפשר לימוד, חוויה, תרבות, קהילה ויצירה משותפת. הדגש שלנו הוא על חיבור בין אנשים בעלי תחומי עניין משותפים באמצעות הצטרפות או יצירה של חוג שיהווה מסגרת חברתית ואינטלקטואלית
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
