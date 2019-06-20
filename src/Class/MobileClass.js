import React from "react"
import JoinCancelButton from "./JoinCancelButton.js"
import ClassTabs from "./ClassTabs.js"
import firebase from "../Firebase/FireBase.js";
import "./MobileClass.css"
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
            isSighnIn: false, 
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
                description:"",
                numOfCurrPartici: 0,
                maxParti: 1,
                partiList:[] }};

        this.whenJoinClicked = this.whenJoinClicked.bind(this)
        this.whenCancelClicked = this.whenCancelClicked.bind(this)
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
            this.setState({
                thisClass:{
                                    organizerId: snapshot.val().organizerId,
                                    organizer: snapshot.val().organizer,
                                    category:snapshot.val().category,
                                    name:snapshot.val().name,
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location,
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
        this.setState({isJoinClicked: true})
        let isLogin = false;
        if(this.props.location.state !== undefined && this.props.location.state.isLogin !== undefined)
        {
            isLogin = this.props.location.state.isLogin;
        }
        if(isLogin)
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

   
    render()
    {
        let isLogin = false;
        if(this.props.location.state !== undefined && this.props.location.state.isLogin !== undefined)
        {
            isLogin = this.props.location.state.isLogin;
        }
        let isManager = false
        if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid === this.state.thisClass.organizerId)
            isManager = true
        let style={};
        if(window.innerWidth < 7)

            style.width = '100%';
        let sendToLogin = false;
        if(!this.state.isLogin && this.state.isJoinClicked)
            sendToLogin = true;

        let location1 = '/Category/' + this.state.category + '/Class/' + this.state.course;
        return(
            <div  className = "all">
                {this.state.loading ? <div>
                    {sendToLogin ? <Redirect to= {{pathname: "/Login" , state:{location:location1, title:"על מנת להרשם לקורס צריך להתחבר"}}}/> : null}
                    <NavBar/>
                    <div  className = "mobilemainDiv">
                        <div className = "upSide" style={style}>
                            <CardImg className = "classImg" variant="top" src={this.state.thisClass.img} />
                        </div>
                        <div className = "downSide" style={style}>
                            <Card style={{ width: '30rem' }}>
                                <CardBody>
                                    <CardTitle className = "title">{this.state.thisClass.name}</CardTitle>
                                    <hr/>
                                    <ListGroup className="list-group-flush">


                                        <div className = "item">
                                            <div className = "itemunittext">  מועבר על ידי - {this.state.thisClass.organizer}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/></svg>
                                            </div>																
                                        </div>

                                        <div className = "item">
                                            <div className = "itemunittext">{this.state.thisClass.category}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/></svg>
                                            </div>						
                                        </div>

                                        <div className = "item">
                                            <div className = "itemunittext">{this.state.thisClass.location}</div>
                                            <div className = "itemuniticon">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                                            </div>								
                                        </div>

                                        {this.state.loading ? 
                                            <div className = "item">
                                                <div className = "itemunittext">{this.numOfPart()}</div>
                                                <div className = "itemuniticon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M6 8c1.11 0 2-.9 2-2s-.89-2-2-2c-1.1 0-2 .9-2 2s.9 2 2 2zm6 0c1.11 0 2-.9 2-2s-.89-2-2-2c-1.11 0-2 .9-2 2s.9 2 2 2zM6 9.2c-1.67 0-5 .83-5 2.5V13h10v-1.3c0-1.67-3.33-2.5-5-2.5zm6 0c-.25 0-.54.02-.84.06.79.6 1.34 1.4 1.34 2.44V13H17v-1.3c0-1.67-3.33-2.5-5-2.5z"/></svg>
                                                </div>								
                                            </div>
                                        : null}

                                    </ListGroup>
                                    <div className = "mobilebutton">
                                        <JoinCancelButton join = {this.whenJoinClicked} cancel = {this.whenCancelClicked} class = {this.state.thisClass} isLogin = {isLogin}/>
                                    </div>
                                    <div className = "mobiletabs">
                                        <ClassTabs  list = {this.state.thisClass.partiList} manager = {isManager} description = {this.state.thisClass.description} date = {this.state.thisClass.date}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </div> 
                    </div> 
                </div> : null}

            </div>
        )
    }
}

export default Classs