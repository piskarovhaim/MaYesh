import React, { Component } from "react";
import { Link } from 'react-router-dom'
import './Class.css'
import Category from "./Category";


class Class extends Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            class:{
                name: props.name,
                location:props.location,
                img:props.img,
                categoryName:props.categoryName,
                date: props.date
            }
        }
    }


        render(){
            //console.log(this.state.class.date);
            let date = new Date(this.state.class.date);
            let style ={}
            if(window.innerWidth < 500){
                style.width = '27vw'
                style.height = '27vw'
            }
            return(
                   <div className ='rcorners' style={style}>
                       <Link to={"/Category/"+ this.state.class.categoryName +"/Class/"+this.state.class.name}>
                        <img src={this.state.class.img} className="imgC"/>
                            <div className="classText">
                                {this.state.class.name}
                                <br/>
                                 {date.toLocaleDateString('en-GB')}
                            </div>
                        </Link>
                    </div>
                
            )
        }
    
}
export default Class;