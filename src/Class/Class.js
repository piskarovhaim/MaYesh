import React from "react"
import JoinCancelButton from "./JoinCancelButton.js"
import ClassTabs from "./ClassTabs.js"
import MobileClass from "./MobileClass.js"
import locIcon from "./SVG/location.svg"
import firebase from "../Firebase/FireBase.js";
import "./Class.css"
import NavBar from "../NavBar/NavBar"
import { Redirect } from 'react-router';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem} from 'reactstrap';



class Classs extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loading: false,
            ifClassFull: false, 
            isJoinClicked: false, 
            isCancelClicked: false, 
            isSignIn: false, 
            category: props.match.params.nameC, 
            course: props.match.params.nameClass, 
            thisClass:{
                organizerId: "",
                organizer: "",
                category:"",
                name:"",
                location:"",
                date: "",
                teacher:"",
                phone:"",
                img:"",
                hour:"",
                endTime:"",
                description:"",
                numOfCurrPartici: 0,
                maxParti: 1,
                minPartici:0,
                partiList:[] }};

        this.whenJoinClicked = this.whenJoinClicked.bind(this)
        this.whenCancelClicked = this.whenCancelClicked.bind(this)
    }

    
    componentDidMount()
    { 
        let currUser = false
        if(firebase.auth().currentUser)
            currUser = true;
        firebase.auth().onAuthStateChanged(user => {
            if(!user)
                currUser = false
            else
                currUser = true
            this.setState({isSignIn: currUser})
          })
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
            this.setState({
                thisClass:{
                                    organizerId: snapshot.val().organizerId,
                                    organizer: snapshot.val().organizer,
                                    category:snapshot.val().category,
                                    name:snapshot.val().name,
                                    hour:snapshot.val().hour,
                                    minPartici:snapshot.val().minPartici,
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location,
                                    endTime: snapshot.val().endTime,
                                    date: snapshot.val().date, 
                                    numOfCurrPartici: snapshot.val().numOfCurrPartici,
                                    maxParti: snapshot.val().maxPartici,
                                    partiList:this.state.thisClass.partiList
                                }
                                ,loading: true})})
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
        if(this.state.isSignIn)
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
        else
            this.setState({isJoinClicked: true})
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
    }

    dateFixer(oldDate){
        let dateFixed = oldDate.slice(8)+"."+oldDate.slice(-5,-3)+"."+oldDate.slice(-12,-6);
        return dateFixed;
    }
    
    notEnPar(curPar,minPar){
        if(minPar>curPar){
            return "אין כרגע מספיק נרשמים לקורס זה."
        } 
        else {
          return "";
        }      
    }


   
    render()
    {
        let isManager = false
        if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === this.state.thisClass.organizerId)
            isManager = true
        let smallSize = false;
        if(window.innerWidth < 7)
        {
            smallSize = true;
        }
        let sendToLogin = false;
        if(this.state.isJoinClicked && !this.state.isSignIn)
            sendToLogin = true;

        let location1 = '/Category/' + this.state.category + '/Class/' + this.state.course;

        let styleImg = 
  {
    backgroundImage : 'url('+this.state.thisClass.img+')',
    height : 100+'vh',
    width : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat  : 'no-repeat',
  }
        return(
            <div>
                {smallSize ? <MobileClass/> : 
            <div  className = "all">
                {this.state.loading ? <div>
                    {sendToLogin ? <Redirect to= {{pathname: "/Login" , state:{location:location1, title:"על מנת להרשם לקורס צריך להתחבר"}}}/> : null}
                    <NavBar/>
                    {/* <div  className = "mainDiv">
                        <div className = "leftSide">
                            <CardImg className = "classImg" variant="top" src={this.state.thisClass.img} />
                            <div className = "tabs">
                                <ClassTabs  list = {this.state.thisClass.partiList} manager = {isManager} description = {this.state.thisClass.description} date = {this.state.thisClass.date}/>
                            </div>
                        </div>
                        <div className = "rightSide">
                            <Card style={{ width: '30rem' }}>
                                <CardBody>
                                    <CardTitle className = "title">{this.state.thisClass.name}</CardTitle>
                                    <hr/>
                                    <ListGroup className="list-group-flush">


                                        <div className = "itemClass">
                                            <div className = "itemunittext">  מועבר על ידי - {this.state.thisClass.organizer}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>
                                            </div>																
                                        </div>

                                        <div className = "itemClass">
                                            <div className = "itemunittext">{this.state.thisClass.category}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/></svg>
                                            </div>						
                                        </div>

                                        <div className = "itemClass">
                                            <div className = "itemunittext">{this.state.thisClass.location}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                            </div>								
                                        </div>

                                        {this.state.loading ? 
                                            <div className = "itemClass">
                                                <div className = "itemunittext">{this.numOfPart()}</div>
                                                <div className = "itemuniticon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M6 8c1.11 0 2-.9 2-2s-.89-2-2-2c-1.1 0-2 .9-2 2s.9 2 2 2zm6 0c1.11 0 2-.9 2-2s-.89-2-2-2c-1.11 0-2 .9-2 2s.9 2 2 2zM6 9.2c-1.67 0-5 .83-5 2.5V13h10v-1.3c0-1.67-3.33-2.5-5-2.5zm6 0c-.25 0-.54.02-.84.06.79.6 1.34 1.4 1.34 2.44V13H17v-1.3c0-1.67-3.33-2.5-5-2.5z"/></svg>
                                                </div>								
                                            </div>
                                        : null}

                                    </ListGroup>
                                    <div className = "button">
                                        <JoinCancelButton join = {this.whenJoinClicked} cancel = {this.whenCancelClicked} class = {this.state.thisClass} isSignIn = {this.state.isSignIn}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </div> 
                    </div>  */
                    <div className="classPage" style={{ 'background-image': `url(${this.state.thisClass.img})` }}>
                        <div className="classPageSec" >
                            <div className="classRightTextBox">
                                <div className="classTextBox">
                                    <span className="dateTag">{this.dateFixer(this.state.thisClass.date)}</span>
                                    <span className="classTextPrimary">{this.state.thisClass.name}</span>
                                    <span className="classTextSub"> מועבר על ידי {this.state.thisClass.organizer}</span>
                                    <div className = "jBtnCont">
                                        <JoinCancelButton join = {this.whenJoinClicked} cancel = {this.whenCancelClicked} class = {this.state.thisClass} isSignIn = {this.state.isSignIn}/>
                                    </div>
                                    <span className="eno" id="partici">{this.notEnPar(this.state.thisClass.numOfCurrPartici,this.state.thisClass.minPartici)}</span>
                                </div>
                          </div>
                          <div className="classLeftTextBox">
                                 <span className="classTextSub">{this.state.thisClass.description}</span>
                          </div>
                          <div className="classDetails">
                                    <div className="locationDiv"> 
                                        <span className="classLocation">{this.state.thisClass.hour}-{this.state.thisClass.hour}</span>
                                        <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                    <title>clock2</title>
                                                    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414-2.829 2.829z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="locationDiv">
                                         <span className="classLocation">{this.numOfPart()}</span>
                                         <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32">
                                                    <title>users</title>
                                                          <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                                                          <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"></path>
                                                    </svg>
                                        </span>
                                    </div>
                                    <div className="locationDiv">
                                        <span className="classLocation">{this.state.thisClass.location}</span>
                                        <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                <title>location</title>
                                                <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"></path>
                                            </svg>
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    }
                </div> : null}

            </div>}
            </div>
        )
    }
}

export default Classs