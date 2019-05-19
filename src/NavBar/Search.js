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

      render(){
          let temp = this.state.classList;
          let keyWord = this.state.keyWord;
          let found = temp.filter((classs)=> classs.name.indexOf(keyWord) > 0)
          const classElements = found.map((classs) =>
          <div className="classFound">{classs.name}</div>
        );
        return(
            <div className="search">
                <input type="text" className="inputSearch" placeholder="..חפש חוג" name="keyWord" value={this.state.keyWord} onChange={this.handleChange}/>
                <div className="dropDownn">
                    {classElements}
                </div>
            </div>
        )
      }

}
export default Search;