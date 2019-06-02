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
        if(this.props.location.state !== undefined && this.props.location.state.isLogin !== undefined)
        {
            isLogin = props.location.state.isLogin;
        }
        
        this.state = {
            loading: false,
            ifClassFull: false, 
            isJoinClicked: false, 
            isCancelClicked: false, 
            isLogin:isLogin,
            isSighnIn: false, 
            category: props.match.params.nameC, 
            course: props.match.params.nameClass, 
            newUser:true,
            thisClass:{
                organizer: "",
                category:"",
                name:"",
                location:"",
                teacher:"",
                phone:"",
                img:"",
                hour:"",
                description:"",
                numOfCurrPartici: 0,
                maxParti: 1,
                partiList:[] }};
    }

    componentDidMount()
    { 
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        ref.child("particiList").on('value', snapshot => {
            let tempParticiList = [];//will keep the list of participants for this class
            snapshot.forEach(element => {
                let itemVal = element.val();
                tempParticiList.push(itemVal);
            });
            
            let tempClass = this.state.thisClass;
            tempClass.partiList = tempParticiList
            this.setState({thisClass:tempClass})
        });
        //update the class details
        ref.on('value', snapshot => {
            console.log(this.state.thisClass.partiList)
            this.setState({
                thisClass:{
                                    organizer: snapshot.val().organizer,
                                    category:snapshot.val().category,
                                    name:snapshot.val().name,
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location, 
                                    numOfCurrPartici: snapshot.val().numOfCurrPartici,
                                    maxParti: snapshot.val().maxPartici,
                                    partiList:this.state.thisClass.partiList
                                },loading: true})})
    }


    
    numOfPart() //returns the number of participants in this class.. if there is not, returns that there is not yet
    {
        let howManyPart = ""
        if(this.state.thisClass.numOfCurrPartici <= 0)
            howManyPart = "אין עדיין משתתפים בקורס זה";
        else
            howManyPart = "משתתפים כרגע " + this.state.thisClass.numOfCurrPartici + " אנשים";
        return(
             howManyPart
        )
    }

    whenJoinClicked()
    {
        this.setState({isJoinClicked: true})
        if(this.state.isLogin)
        {
            let tempNumOfCurPart;
            const uid = firebase.auth().currentUser.uid
            let user;
            let ref = firebase.database().ref('/Users/' + uid)
            ref.once('value', snapshot => {user = snapshot.val()})
            
            ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
            ref.child('particiList').push(user)
    
            ref.child("numOfCurrPartici").once('value', snapshot => {
                tempNumOfCurPart = snapshot.val() + 1;
            })
            ref.child("numOfCurrPartici").set(tempNumOfCurPart);
        }

    }

    whenCancelClicked()
    {
        this.setState({isCancelClicked: true})
        let tempNumOfCurPart;
        const uid = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course + '/particiList');
        ref.once('value', snapshot => {snapshot.forEach(
            participant => {
                if(participant.val().id === uid)
                {
                    let refChild = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course + '/particiList/' + participant.key);
                    refChild.remove();
                }
                
        })})
        ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        //decreasing 1 participant in numOfCurrPartici
        ref.child("numOfCurrPartici").on('value', snapshot => {
            tempNumOfCurPart = snapshot.val() - 1;
        })
        ref.child("numOfCurrPartici").set(tempNumOfCurPart);
        //remove from list

    }

    ifAlreadyParti()//returns Cancel button if the user is already in, and Join if else
    {
        let ifFull = false
        if(this.state.thisClass.numOfCurrPartici === this.state.thisClass.maxParti)
        {
            ifFull = true//the class is full
        }
        let button = null;
        if(this.state.thisClass.partiList === undefined)
            return null;
        this.state.thisClass.partiList.forEach(participant => {
            if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === participant.id)
                button = <Button className = "button1" variant="contained" color="primary"  onClick = {()=>this.whenCancelClicked()}>ביטול רישום</Button>
        })
        if(button === null && ifFull)//class full and cuurent user is not in
            button = (<p>הקורס מלא</p>)
        else if(button === null)//classis not  full and cuurent user is not in
            button = <Button className = "button1" variant="contained" color="primary"  onClick = {()=>this.whenJoinClicked()}>Join</Button>
        return(button)
    }


    render()
    {
        console.log(this.state.thisClass)
        let style={};
        if(window.innerWidth < 7)
            style.width = '100%';
        let sendToLogin = false;
        if(!this.state.isLogin && this.state.isJoinClicked)
            sendToLogin = true;

        let location1 = '/Category/' + this.state.category + '/Class/' + this.state.course;
        return(
            
            <div  className = "mainDiv">
                {this.state.loading ? <div>
                {sendToLogin ? <Redirect to= {{pathname: "/Login" , state:{location:location1, title:"על מנת להרשם לקורס צריך להתחבר"}}}/> : null}
                <NavBar/>
                <div className = "leftSide" style={style}>
                    <CardImg className = "classImg" variant="top" src={this.state.thisClass.img} />
                </div>
                <div className = "rightSide" style={style}>
                    <Card style={{ width: '30rem' }}>
                        <CardBody>
                            <CardTitle className = "title">{this.state.thisClass.name}</CardTitle>
                            <hr/>
                            <ListGroup className="list-group-flush">
                                <p>{this.state.thisClass.description}</p>
                                <ListGroupItem className = "item">  מועבר על ידי - {this.state.thisClass.organizer}</ListGroupItem>
                                <ListGroupItem className = "item"> {this.state.thisClass.category}</ListGroupItem>
                                <ListGroupItem className = "item"> {this.state.thisClass.location}</ListGroupItem>
                                {this.state.loading ? <ListGroupItem className = "item">{this.numOfPart()}</ListGroupItem> : null}
                            </ListGroup>
                            <div className = "button">
                                 {this.ifAlreadyParti()}
                            </div>
                        </CardBody>
                    </Card>
                </div>  </div> : null}
            </div>
        )
    }
}

export default Classs