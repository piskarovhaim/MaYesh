import React, { Component } from "react";
import './Search.css'
import firebase from "../Firebase/FireBase.js";

class Search extends Component {

    constructor(){
        super()
        this.state ={
            classList :[],
            keyWord:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentWillMount()  {
        let arrTempAllClasses = [];
        let ref = firebase.database().ref('/CategoryList');
        ref.on('value', snapshot => {
          snapshot.forEach(child => {
                let temp = child.val().classList;
                for (let key in temp) {
                    arrTempAllClasses.push(temp[key]);
                  }
            });
            this.setState({classList:arrTempAllClasses});
        });
      };

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
    handleBlur(){
        this.setState({keyWord:""}) ;   
    }

      render(){
          let temp = this.state.classList;
          let keyWord = this.state.keyWord;
          let found = [];
          let classElements;
          if(keyWord !== ""){
            found = temp.filter((classs)=> classs.name.indexOf(keyWord) >= 0)
            classElements = found.map((classs,i) =>
            <div className="classFound" key={i}>{classs.name}</div>
            );
          }
          let notFound;
          if(found.length === 0 && keyWord !== "")
            notFound = <div className="classFound">לא נמצאו תוצאות</div>
  
        return(
            <div className="search">
                <input type="text" value={this.state.keyWord} className="inputSearch" placeholder="...חפש חוג" name="keyWord" onChange={this.handleChange} onBlur={this.handleBlur} autoComplete="off"/>
                <div className="dropDownn">
                    {classElements}
                    {notFound}
                </div>
            </div>
        )
      }

}
export default Search;