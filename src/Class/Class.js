import React from "react"
import firebase from "../Firebase/FireBase.js";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./Class.css"

class Classs extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {isSignedIn: false, newUser:true, loading : true,
            thisClass:{name:"",location:"",teacher:"",phone:"",img:"",hour:"",description:""} };
    }
    func()
    {
        //let ref = firebase.database().ref('/CategoryList');
    }
    
    render()
    {
        let category = "Art"
        let kourse = "יוגה עם חיים"
        let title = "before"
        let ref = firebase.database().ref('/CategoryList/' + category + '/classList/' + kourse);
        ref.once('value', snapshot => {
            this.setState({thisClass:{name:snapshot.val().name,
                                     description:snapshot.val().description,
                                     img:snapshot.val().image  }})})
        return(
            <div className = "mainDiv">
                <div className = "leftSide">
                    <img style = {{height: 400, width: 500}} src = {this.state.thisClass.img} />
                </div>
                <div className = "rightSide">
                    <div className = "title">
                        <h2>{this.state.thisClass.name}</h2>
                    </div>
                    <hr/>
                    <div className = "paragraph">
                        <p>תיאור: {this.state.thisClass.description}</p>
                    </div>
                    <hr/>
                    <div className = "joinButton">
                        <button >Join class</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Classs 