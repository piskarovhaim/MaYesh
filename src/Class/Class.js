import React from "react"
import firebase from "../Firebase/FireBase.js";
import "./Class.css"
import NavBar from "../NavBar/NavBar"
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem} from 'reactstrap';



class Classs extends React.Component
{
    constructor(props)
    {
        super(props);
        let isLogin = false;
        if(props.location !== undefined)
            isLogin = props.location.isLogin;
        this.state = {ifClassFull: false,isJoinClicked: false, isLogin:isLogin,isSighnIn: false, category: props.catname, course: props.classname, newUser:true, loading : true,
            thisClass:{name:"",location:"",teacher:"",phone:"",img:"",hour:"",description:"", numOfCurrPartici: 0, maxParti: 0, partiList:[] }};
    }

    componentDidMount()
    {
        
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        let tempParticiList = [];//will keep the list of participants for this class
        ref.child("particiList").once("value", snapshot => {
            snapshot.forEach(element => {
                let itemVal = element.val();
                tempParticiList.push(itemVal);
            });
        });
        //update the class details
        ref.once('value', snapshot => {
            this.setState({thisClass:{
                                    name:snapshot.val().name,
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location, 
                                    numOfCurrPartici: snapshot.val().numOfCurrPartici,
                                    maxParti: snapshot.val().maxPatici,
                                    partiList: tempParticiList
                                }})})
    }
    
    numOfPart() //returns the number of participants in this class.. if there is not, returns that there is not yet
    {
        let howManyPart = ""
        if(this.state.thisClass.numOfCurrPartici <= 0)
        {
            howManyPart = "אין עדיין משתתפים בקורס זה";
        }
        else
        {
            howManyPart = "משתתפים כרגע " + this.state.thisClass.numOfCurrPartici + " אנשים";
        }
        return(
             howManyPart
        )
    }

    whenJoinClicked()
    {
        this.setState({isJoinClicked: true})
        let tempNumOfCurPart;
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        // if(this.state.thisClass.numOfCurrPartici <= 0)//first participant - create list
        // {
        //     alert("here")
        //     ref.push().set({name: firebase.auth().currentUser})
        // }
        // ref.child("ParticiList").push().set(firebase.auth().currentUser)
        //increasing 1 participant in numOfCurrPartici
        ref.child("numOfCurrPartici").once('value', snapshot => {
            tempNumOfCurPart = snapshot.val() + 1;
        })
        ref.child("numOfCurrPartici").set(tempNumOfCurPart);
        //add to list
    }

    whenCancelClicked()
    {
        let tempNumOfCurPart;
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        //decreasing 1 participant in numOfCurrPartici
        ref.child("numOfCurrPartici").once('value', snapshot => {
            tempNumOfCurPart = snapshot.val() - 1;
        })
        ref.child("numOfCurrPartici").set(tempNumOfCurPart);
        //remove from list
    }

    ifAlreadyParti()//returns Cancel button if the user is already in, and Join if else
    {
        let button = <Button className = "button1" variant="contained" color="primary"  onClick = {()=>this.whenJoinClicked()}>Join</Button>
        if(this.state.thisClass.partiList === undefined)
            return null;
        this.state.thisClass.partiList.forEach(participant => {
            if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === participant.id)
                button = <Button className = "button1" variant="contained" color="primary"  onClick = {()=>this.whenCancelClicked()}>ביטול רישום</Button>
        })
        return(button)
    }


    render()
    {
        let sendToLogin = false;
        if(!this.state.isLogin && this.state.isJoinClicked)
            sendToLogin =true;
        if(this.state.thisClass.numOfCurrPartici === this.state.thisClass.maxParti)
            this.setState.ifClassFull = true;//the class is full 
        else
            this.setState.ifClassFull = false;//the class is not full 
            
        let location1 = '/CategoryList/' + this.state.category + '/classList/' + this.state.course;
        const classFullMessage = (<p>הקורס מלא</p>)
        return(
            <div  className = "mainDiv">
                {sendToLogin ? <Redirect to= {{pathname: "/Login" , state:{location:location1, title:"על מנת להרשם לקורס צריך להתחבר"}}}/> : null}
                <NavBar/>
                <div className = "leftSide">
                    <CardImg className = "classImg" variant="top" src={this.state.thisClass.img} />
                    <div>
                        {this.setState.ifClassFull ? classFullMessage : this.ifAlreadyParti()}
                    </div>
                </div>
                <div className = "rightSide">
                    <Card style={{ width: '30rem' }}>
                        <CardBody>
                            <CardTitle className = "title">{this.state.thisClass.name}</CardTitle>
                            <ListGroup className="list-group-flush">
                                <p>{this.state.thisClass.description}</p>
                                <ListGroupItem className = "location"> {this.state.thisClass.location}</ListGroupItem>
                                <ListGroupItem className = "numOfCurrPartici">{this.numOfPart()}</ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                </div>  
            </div>
        )
    }
}

export default Classs 