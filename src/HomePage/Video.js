import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './Video.css'

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
        const setVideoHeight = {
            height: this.state.videoStyle.height
          }
        return (
        <div className="video" style={setVideoHeight}>
            <video src="https://www.meetup.com/mu_static/en-US/video.dddafbfe.mp4" autoPlay loop muted/>
            <div className="c">
                <button className="videoButton" onClick={() => window.scrollTo(0, this.state.videoStyle.height)}>הצטרף לחוג</button>
              <Link to="/NewClass">
              <button className="videoButton">צור חוג חדש</button>
              </Link>
            </div>
        </div>
        )
        }
    }
    export default Video;