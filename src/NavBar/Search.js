import React, { Component } from "react";
import './Search.css'
import firebase from "../Firebase/FireBase.js";
import { Redirect } from 'react-router';

class Search extends Component {

    constructor(props){
        super(props)
        this.state ={
            classList :[],
            keyWord:"",
            currentclass:"",
            currentcategory:"",
            redirect:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount()  {
        let ref = firebase.database().ref('/CategoryList');
        ref.on('value', snapshot => {
          let arrTempAllClasses = [];
          snapshot.forEach(child => {
                let temp = child.val().classList;
                for (let key in temp) {
                    if(temp[key].isConfirmed && !this.props.manage)
                      arrTempAllClasses.push(temp[key]);
                    if(this.props.manage)
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
          let style ={}
          if(window.innerWidth < 500){
            style.width = 100;
          }
          
          
          let temp = this.state.classList;
          let keyWord = this.state.keyWord;
          let found = [];
          let classElements;
          if(keyWord !== ""){
            found = temp.filter((classs) => classs.name.indexOf(keyWord) >= 0)
            classElements = found.map((classs,i) =>
          <div className="classFound" key={i} onMouseDown={()=>this.setState({redirect:true,currentcategory:classs.category,currentclass:classs.name})}>{classs.name} | {classs.category}</div>
            );
          }
          let notFound;
          if(found.length === 0 && keyWord !== "")
            notFound = <div className="classFound">לא נמצאו תוצאות</div>
          let path = "/Category/"+ this.state.currentcategory +"/Class/"+ this.state.currentclass;
          let styleSearch = {}
          if(this.props.manage){
              path = "/ManageClass/"+ this.state.currentcategory +"/"+this.state.currentclass;
              styleSearch.right = '0';
          }
        return(
            <div className="search" style={style} >
                {this.state.redirect ? <Redirect to={{pathname: "/RedirectTemp", location:{l:path}}}/> : null}
                <input type="text" value={this.state.keyWord} className="inputSearch" placeholder="...חפש חוג" name="keyWord" onChange={this.handleChange} onBlur={this.handleBlur} autoComplete="off"/>
                <div className="dropDownn" style={styleSearch}>
                    {classElements}
                    {notFound}
                </div>
            </div>
        )
      }

}
export default Search;