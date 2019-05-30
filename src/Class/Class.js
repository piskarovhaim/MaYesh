import React from "react"
import firebase from "../Firebase/FireBase.js";
import "./Class.css"
import Button from '@material-ui/core/Button';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem} from 'reactstrap';



    class Classs extends React.Component
    {
        constructor(props)
        {
            super(props);
            this.state = {category: props.catname, course: props.classname, isSignedIn: false, newUser:true, loading : true,
                thisClass:{name:"",location:"",teacher:"",phone:"",img:"",hour:"",description:"", numOfCurrPart: 0} };
        }

    componentDidMount()
    {
        let ref = firebase.database().ref('/CategoryList/' + this.state.category + '/classList/' + this.state.course);
        ref.once('value', snapshot => {
            this.setState({thisClass:{
                                    name:snapshot.val().name,
                                    description:snapshot.val().description,
                                    img:snapshot.val().imgUrl,
                                    location: snapshot.val().location, 
                                    numOfCurrPartici: snapshot.val().numOfCurrPart
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
            howManyPart = "משתתפים כרגע" + this.state.thisClass.numOfCurrPartici + "אנשים";
        }
        return(
             howManyPart
        )
    }

    whenClicked()
    {
        //sighin
        //class is not full
        //numOfCurrPart++
        //join sucessfully
        this.state.thisClass.numOfCurrPart = 1;
        alert(this.state.thisClass.numOfCurrPartici)
        return(
            "clicked"
        )
    }

    render()
    {
        return(
            <div  className = "mainDiv">
                <div className = "leftSide">
                    <CardImg className = "classImg" variant="top" src={this.state.thisClass.img} />
                    <div>
                        <Button className = "button1" variant="contained" color="primary"  onClick = {()=>this.whenClicked()}>Join</Button>
                        <Button className = "button2" variant="contained" color="primary"  onClick = {()=>this.whenClicked()}>back</Button>
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