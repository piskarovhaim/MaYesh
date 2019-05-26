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
            }
        }
    }


        render(){

            return(
                <Link to={"/Category/"+ this.state.class.categoryName +"/Class/"+this.state.class.name}>

                    <div className ='rcorners' >
                        <img src={this.state.class.img} className="imgC"/>
                        <div className="classText">
                            <div className = "className">
                                {this.state.class.name}
                            </div>    
                            <br/><br/>
                            <div className = "classLocation">
                                {this.state.class.location}
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }
    
}
export default Class;