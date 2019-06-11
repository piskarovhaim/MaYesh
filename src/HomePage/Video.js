
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
                        <a href="/NewClass" className="btn pinkBtn">צור חוג חדש</a>

                        <a href="#" className="btn greenBtn" onClick={() => window.scrollTo(0,window.innerHeight-window.innerHeight)}>הצטרף לחוג</a>
                    </div>
                </div>
            </div>
        )
        }
    }
    export default Video;