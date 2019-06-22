import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './Video.css'
import AnchorLink from 'react-anchor-link-smooth-scroll'

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

        let style ={}
        if(window.innerWidth < 500){
          style.width = '90%';
          style.top = '0';
        }
        return (
        <div className="header">
                    <div className="textBox" style={style}>
                        <div className="headerText">
                            <span className="headerTextPrimary">אנשים פוגשים אנשים</span>
                            <span className="headerTextSub">הצטרפו למגוון חוגים בכל נושא שמעניין אתכם</span>
                            </div>
                    
                    <div className="btns">
                        <Link to="/NewClass">
                            <button className="btn pinkBtn">צור חוג חדש</button>
                        </Link>
                        <AnchorLink href='#joinToClass'>
                            <button className="btn greenBtn">הצטרפות לחוג</button>
                        </AnchorLink>
                    </div>
                </div>
        </div>
        )
        }
    }
    export default Video;