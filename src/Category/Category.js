import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import NavBar from "../NavBar/NavBar.js";
import Class from "../Category/Class.js"
class Category extends Component {

  constructor(props) {
      
    super(props);
    this.state = 
    {
        category:{
            classList: [],
            desc: "",
            img: "",
            likesCounter: "",
            name: props.name 
        }
    }

    //this.searchCategory = this.searchCategory.bind(this);
  }
  componentDidMount(){
    let cat = firebase.database().ref('CategoryList');
    cat.child('Sport').on('value' ,snapshot => {
            this.setState({category:snapshot.val()})
    })
    console.log();
  }
  /*
 async searchCategory(){
    let db = firebase.database();
    let collection = db.ref("CategoryList/"+this.state.name);
    console.log(collection);

  }
  */
  render() {
   // this.searchCategory();
   console.log(this.state.category);
    return (
        <div>
            <header>
                <h1>{this.state.category.desc}</h1>
            </header>
            <img src={this.state.category.img}></img>
            <body>
               <Class name = {"football"}/>>
            </body>
        </div>
    )
  }
}

export default Category;
