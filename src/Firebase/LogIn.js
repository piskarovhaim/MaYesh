import React, { Component } from "react"
import firebase from './FireBase.js'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


class LogIn extends Component {
    
  constructor(){
    super();
    this.state = { isSignedIn: false,newUser:true,loading : true,
    user:{id:"",email:"",name:"",phone:"",img:"",favoriteCat:"",listOfSignInClass:""} };
  
  this.handleChange = this.handleChange.bind(this);
  this.AddUser = this.AddUser.bind(this);
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
    
}
  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {

      this.setState({ isSignedIn: !!user})
      if(!user)
        return;
        
      let ref = firebase.database().ref('/Users');
      ref.on('value', snapshot => {
        snapshot.forEach(child => {
            console.log(child.key)
            if(user.uid == child.key)
                this.setState({newUser:false,loading:false});
          });
          if(user)
            this.setState({loading:false,user:{id:user.uid,email:user.email,name:user.displayName,phone:user.phoneNumber,img:user.photoURL,favoriteCat:"",listOfSignInClass:""}});
      });
    })
  }

  handleChange(event) {
    let temp = this.state.user;
    let name = event.target.name;
    switch(name) {
        case 'name':
            temp.name = event.target.value;
            break;
        case 'phone':
            temp.phone = event.target.value;
            break;
        default:
      }
    
    this.setState({user: temp});
  }

  AddUser(){
    console.log(this.state.user);
    firebase.database().ref('/Users/' + this.state.user.id).set(this.state.user);
    this.setState({newUser:false,loading:false});
  }

  render() {
    let signin =false;
    let fill = false;
    let close = false;
    if(this.state.newUser && this.state.isSignedIn && !this.state.loading)
        fill = true;
    if(!this.state.newUser && this.state.isSignedIn)
        close = true;
    if(!this.state.isSignedIn)
      signin =true;
    return (
      <div className="App">

          {signin ? (
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}/>
          ):null}
          {fill ? (
            <div>
            <h1>שלום לך!</h1>
            <img src={this.state.img} />
            <label>
            <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}></input>
              ?השם שלך
            </label>
            <label>
            <input type="text" name="phone" value={this.state.user.phone} onChange={this.handleChange}></input>
            ?הפלאפון שלך
            </label>
            <br/>
            בחר את הקטגויות המועדפות שלך
            <br/>
            <input type="checkbox" name="o1" value="food"/>food<br/>
            <input type="checkbox" name="o2" value="sport"/>sport<br/>
            <input type="checkbox" name="03" value="yuga"/> yuga<br/>
            <button onClick={this.AddUser}> שמור</button>
            </div>
          ):null}
          {close ? (
            window.close()
          ):null}
      
      </div>
    )
  }
}

export default LogIn