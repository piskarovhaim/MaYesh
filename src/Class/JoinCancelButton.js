import React from "react"
import "./Class.css"
import Button from '@material-ui/core/Button';
import firebase from "../Firebase/FireBase.js";

class JoinCancelButton extends React.Component
{
    ifAlreadyParti()//returns Cancel button if the user is already in, and Join if else
    {
        if(this.props.isLogin && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === this.props.class.organizerId)
            return null;
        let ifFull = false
        if(this.props.class.numOfCurrPartici === this.props.class.maxParti)
        {
            ifFull = true//the class is full
        }
        let button = null;
        if(this.props.class.partiList === undefined)
            return null;
        this.props.class.partiList.forEach(participant => {
            if(this.props.isLogin && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === participant.id)
            {
                button = <Button className = "button1" variant="contained" color="primary"  onClick = {this.props.cancel}>ביטול רישום</Button>
            }
                
        })
        if(button === null && ifFull)//class full and cuurent user is not in
            button = (<p className = "classFull">הקורס מלא</p>)
        else if(button === null || !this.props.isLogin)//classis not  full and cuurent user is not in
            button = <Button className = "button1" variant="contained" color="primary"  onClick = {this.props.join}>Join</Button>
        return(button)
    }

    render()
    {
        return(
            <div>
                {this.ifAlreadyParti()}
            </div>
        )
    }
}

export default JoinCancelButton