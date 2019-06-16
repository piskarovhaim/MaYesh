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
        <div className="header">
                    <div className="textBox">
                        <div className="headerText">
                            <span className="headerTextPrimary">העולם בחוץ קורא לכם</span>
                            <span className="headerTextSub">הצטרפו למגוון חוגים בכל נושא שמעניין אתכם</span>
                            </div>
                    
                    <div className="btns">
                        <Link to="/NewClass">
                            <button className="btn pinkBtn">צור חוג חדש</button>
                        </Link>
                        <button className="btn greenBtn" onMouseDown="autoScrollTo(<ClassBy/>)">הצטרף לחוג</button>
                    </div>
                </div>
        </div>
        )
        }
    }
    export default Video;