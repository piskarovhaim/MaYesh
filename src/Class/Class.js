import React from "react"
import firebase from "../Firebase/FireBase.js";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import "./Class.css"
import Button from '@material-ui/core/Button';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, ListGroup, ListGroupItem} from 'reactstrap';


function Join() 
{
  return (
    <Button variant="contained" color="primary">
      Join
    </Button>)
}

function ClassCard()
{
    return(
        <Card style={{ width: '18rem' }}>
            <CardImg variant="top" src="https://firebasestorage.googleapis.com/v0/b/mayesh-bd07f.appspot.com/o/imgs%2Fyoga.jpg?alt=media&token=1c744d8c-f29b-40b1-82aa-a9efc1ba97dc" />
            <CardBody>
                <CardTitle>Card Title</CardTitle>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
                <Button variant="contained" color="primary">Join</Button>
            </CardBody>
      </Card>
    )
}


class Classs extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {isSignedIn: false, newUser:true, loading : true,
            thisClass:{name:"",location:"",teacher:"",phone:"",img:"",hour:"",description:"", numOfCurrPartici:""} };
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
                                     img:snapshot.val().image,
                                     location: snapshot.val().location, 
                                     numOfCurrPartici: snapshot.val().numOfCurrPartici }})})
        return(
            <div  className = "mainDiv">
                <div className = "leftSide">
                    <CardImg variant="top" src={this.state.thisClass.img} />
                    <Button className = "button" variant="contained" color="primary">Join</Button>
                </div>
                <div className = "rightSide">
                    <Card style={{ width: '30rem' }}>
                        <CardBody>
                            <CardTitle className = "title">{this.state.thisClass.name}</CardTitle>
                            <ListGroup className="list-group-flush">
                                <p>{this.state.thisClass.description}</p>
                                <ListGroupItem className = "location"> {this.state.thisClass.location}</ListGroupItem>
                                <ListGroupItem className = "location">משתתפים כרגע {this.state.thisClass.numOfCurrPartici} אנשים  </ListGroupItem>
                            </ListGroup>
                        </CardBody>
                    </Card>
                </div>  
            </div>
        )
    }
}

export default Classs 