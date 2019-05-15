import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import './Video.css'
import { ScrollTo } from "react-scroll-to";

class Video extends Component {

    constructor(props){
        super(props);
        this.state ={
            videoStyle:{
                height: (window.innerHeight/1.3)
            }
        }
    }

    render() {
        const setHeight = {
            height: this.state.videoStyle.height
          }
        return (
            <div>
            <Route path="/" exact render={() => {return (
        <div className="video" style={setHeight}>
            <video src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4" autoPlay loop muted/>
            <div className="c">
                <button className="videoButton">הצטרף לחוג</button>
              <Link to="//NewClass">
              <button className="videoButton">צור חוג חדש</button>
              </Link>
              </div>
        </div>
            
        );}}/>
        </div>)
    }
    }
    export default Video;