import React from "react"
import JoinCancelButton from "./JoinCancelButton.js"
import firebase from "../Firebase/FireBase.js";
import "./Class.css"
import NavBar from "../NavBar/NavBar"
import { Redirect } from 'react-router';
import ParticipantList from "./ParticipantList.js"
import { Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import { red } from "@material-ui/core/colors";

/*
    Class - return the class page.
    Class use 'JoinCancelButton' component to display 'join to class' or 'cancel' button, and 
    'ParticipantList' component to display all class's participans.
*/

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
            displayPartici:false, 
            displayThanksForJoin: false,
            displayOrgenizerDetails: false,
            category: props.match.params.nameC, 
            course: props.match.params.nameClass,
            ListOfSignInClassesForThisUser: [], 
            categoryObject: {},
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
        this.displayPartici = this.displayPartici.bind(this);
        this.displayThanksForJoin = this.displayThanksForJoin.bind(this);
        this.displayOrgenizerDetails = this.displayOrgenizerDetails.bind(this);
        this.organizerDetails = this.organizerDetails.bind(this);
    }

    
    componentDidMount()
    { 
        //check if the current user is signed in
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

        //updating the list of all participant in this class 
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
                                    minPartici:parseInt(snapshot.val().minPartici,10),
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location,
                                    endTime: snapshot.val().endTime,
                                    date: snapshot.val().date, 
                                    numOfCurrPartici: snapshot.val().numOfCurrPartici,
                                    maxParti:  parseInt(snapshot.val().maxPartici,10),
                                    partiList:this.state.thisClass.partiList
                                }
                                ,loading: true})})

        //getting the object of this category for "לעוד קורסים בקטגוריה זאת"
        ref = firebase.database().ref('/CategoryList')
        ref.once('value', snapshot => {snapshot.forEach(element =>{
            if(this.state.category === element.val().name)
                this.setState({categoryObject: element.val()})
        })})
    }

    displayPartici(){ // show/hide Partici List
        this.setState({displayPartici:!this.state.displayPartici})
    }

    displayThanksForJoin(){ // show/hide Partici List
        this.setState({displayThanksForJoin:!this.state.displayThanksForJoin})
    }

    displayOrgenizerDetails(){ // show/hide Partici List
        this.setState({displayOrgenizerDetails:!this.state.displayOrgenizerDetails})
    }

    //return the details (mail and phone number) of this class organizer
    organizerDetails()
    {
        let email, phone, url;
        let ref = firebase.database().ref('/Users/' + this.state.thisClass.organizerId)
        ref.once('value', snapshot => {
                email = snapshot.val().email
                phone = snapshot.val().phone
                url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email + "&tf=1"
        })
        let mailDiv = <div>{email}</div>
        if(window.innerWidth >= 500)//not a mobile
            mailDiv = <div className="divSendEmail" onClick={()=>window.open(url,"_blank","toolbar=yes,menubar=no,titlebar=no,scrollbars=no,resizable=no,status=no,bottom=0,right=50,width=400,height=400")}>{email}</div>
        return (<div>
            {mailDiv}
            <br/>
            <div>{phone}</div>
            <br/>
        </div>)
    }
    
    //returns the number of participants in this class.. if there is not, returns that there is not yet
    numOfPart() 
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

    //onclick join button
    whenJoinClicked()
    {
        if(this.state.isSignIn)
        {
            let tempNumOfCurPart;
            const uid = firebase.auth().currentUser.uid
            let user;
            let thisClass;
            let ref = firebase.database().ref('/Users/' + uid)
            ref.once('value', snapshot => {user = snapshot.val()})
            let refToClass = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course); 
            refToClass.once('value', snapshot => {thisClass = snapshot.val()})
            ref.child('ListOfSignInClasses').push(thisClass)
            
            ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
            ref.child('particiList').push(user)
    
            ref.child("numOfCurrPartici").once('value', snapshot => {
                tempNumOfCurPart = snapshot.val() + 1;
            })
            ref.child("numOfCurrPartici").set(tempNumOfCurPart);
            Alert.success("<p align=\"right\"> מעולה, שמחים שנרשמת! יום לפני המפגש תפתח קבוצת וואטספ זמנית שבה יעודכנו פרטי המפגש. אם אין באפשרותכם לבוא, עשו טובה, שלחו וואטסאפ למארגן, שלא יהיה פה הקיץ של אביה </p>",{
                html:true,
                onShow: this.displayThanksForJoin,
                onClose: this.displayThanksForJoin
              });
            
        }
        else
            this.setState({isJoinClicked: true})//direct to 'sign in'
    }

    
    //onclick cancel button
    whenCancelClicked()
    {
        this.setState({isCancelClicked: true})
        let tempNumOfCurPart;
        const uid = firebase.auth().currentUser.uid
        let ref = firebase.database().ref('/Users/' + uid + '/ListOfSignInClasses')
        ref.once('value', snapshot => {snapshot.forEach(
            participant => {
                if(participant.val().name === this.state.course)
                {
                    let classToRemove = firebase.database().ref('/Users/' + uid + '/ListOfSignInClasses/' + participant.key);
                    classToRemove.remove();
                }
        })})
        ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course + '/particiList');
        ref.once('value', snapshot => {snapshot.forEach(
            participant => {
                if(participant.val().id === uid)
                {
                    let refChild = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course + '/particiList/' + participant.key);
                    refChild.remove();
                    Alert.error("<p align=\"right\"> ביטלת את הרישום לחוג, אל תשכח להודיע זאת גם למארגן החוג.     נתראה בחוג אחר :)</p>",{
                        html:true,
                      });
                }
                
        })})
        ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        //decreasing 1 participant in numOfCurrPartici
        ref.child("numOfCurrPartici").on('value', snapshot => {
            tempNumOfCurPart = snapshot.val() - 1;
        })
        ref.child("numOfCurrPartici").set(tempNumOfCurPart);
    }

    //fix the display of the date (to 01.12.2019 form)
    dateFixer(oldDate){
        let dateFixed = oldDate.slice(8)+"."+oldDate.slice(-5,-3)+"."+oldDate.slice(-12,-6);
        return dateFixed;
    }
    
    //checking if there is enough participant. this function is not used for now
    notEnPar(curPar,minPar){
        if(minPar>curPar){
            return "אין כרגע מספיק נרשמים לקורס זה."
        } 
        else {
          return "";
        }      
    }

    //getting the day of some date
    getDayOf(date){
        let d = new Date(date);
        let days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
        return days[d.getDay()];
    }


   
    render()
    {
        let back ="<";
        let isManager = false
        if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === this.state.thisClass.organizerId)
            isManager = true
        let stylePhone ={}
        if(window.innerWidth < 500)//mobile display
        {
            stylePhone.width = '90%';
            stylePhone.letterSpacing='0';
            stylePhone.float = 'right'
        }
        let sendToLogin = false;//if send the user to login
        if(this.state.isJoinClicked && !this.state.isSignIn)
            sendToLogin = true;

        let location1 = '/Category/' + this.state.category + '/Class/' + this.state.course;
        return(
            <div>
                {this.state.loading ? <div>
                    {sendToLogin ? <Redirect to= {{pathname: "/Login" , state:{location:location1, title:"על מנת להרשם לקורס צריך להתחבר"}}}/> : null}
                    {
                    <div className="containerBox">
                        <div className="classcontentbackground">
                            <div className="classcontentbackgroundimage" style={{ 'backgroundImage': `url(${this.state.thisClass.img})` }}>
                                <div className="classcontentbackgroundshadow" />
                            </div>
                        </div>
                        <div className="classPageSec">
                        <NavBar/>
                        <Link to = "/" className="linkto">
                                  <div className="backbut">
                                      <span className="iconCont">
                                            <svg className="backSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                <title>arrow-left2</title>
                                                <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
                                            </svg>
                                        </span></div>
                            </Link>
                            <div className="topdivclass">
                                <div className="classRightTextBox" style={stylePhone}>
                                    <span className="dateTag">{this.getDayOf(this.state.thisClass.date)} {this.dateFixer(this.state.thisClass.date)}</span>
                                    <span className="classTextPrimary">{this.state.thisClass.name}</span>
                                    <div className="iconclasstoright" style={{cursor: 'pointer'}} onClick={this.displayOrgenizerDetails}>
                                        <span className="classTextSub"> מועבר על ידי {this.state.thisClass.organizer}</span>
                                    </div>
                                    {this.state.displayOrgenizerDetails ? 
                                        <div>
                                                {this.organizerDetails()}
                                        </div>
                                    : null}
                                        <JoinCancelButton join = {this.whenJoinClicked} cancel = {this.whenCancelClicked} class = {this.state.thisClass} isSignIn = {this.state.isSignIn}/>
                                        <Link to = {{pathname: "/Category/" + this.state.thisClass.category, state:{category: this.state.categoryObject}}} className="linkto">
                                            <div className="morefromthiscategory">חוגים נוספים בקטגוריית {this.state.thisClass.category}</div>
                                        </Link>

                                </div>
                                <div className="classLeftTextBox" style={stylePhone}>
                                 <span className="classTextDesc">{this.state.thisClass.description}</span>
                                 </div>       
                          </div>
                          <div className="classDetails">
                                    <div className="locationDiv" style={stylePhone}> 
                                    <div className="iconclasstoright">
                                        <span className="classLocation">{this.state.thisClass.hour} - {this.state.thisClass.endTime}</span>
                                    </div>
                                        <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                    <title>clock2</title>
                                                    <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414-2.829 2.829z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="locationDiv" style={stylePhone} > 
                                    <div className="iconclasstoright" style={{cursor: 'pointer'}} onClick={this.displayPartici}>
                                        <span className="classLocation">{this.numOfPart()}</span>
                                    </div>
                                    {this.state.displayPartici ? <ParticipantList list = {this.state.thisClass.partiList} manager = {isManager} func={this.displayPartici}/>: null}
                                         <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32">
                                                    <title>users</title>
                                                          <path d="M24 24.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z"></path>
                                                          <path d="M10.225 24.854c1.728-1.13 3.877-1.989 6.243-2.513-0.47-0.556-0.897-1.176-1.265-1.844-0.95-1.726-1.453-3.627-1.453-5.497 0-2.689 0-5.228 0.956-7.305 0.928-2.016 2.598-3.265 4.976-3.734-0.529-2.39-1.936-3.961-5.682-3.961-6 0-6 4.029-6 9 0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h8.719c0.454-0.403 0.956-0.787 1.506-1.146z"></path>
                                                    </svg>
                                        </span>
                                    </div>
                                    <div className="locationDiv" style={stylePhone}>
                                    <div className="iconclasstoright">
                                        <span className="classLocation">{this.state.thisClass.location}</span>
                                    </div>
                                        <span className="iconCont">
                                             <svg className="iconSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                <title>location</title>
                                                <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <span className="eno" id="partici">{this.notEnPar(this.state.thisClass.numOfCurrPartici,this.state.thisClass.minPartici)}</span>
                                </div>
                            </div>
                        </div>
                    }
                </div> : null}
            </div>
        )
    }
}

export default Classs