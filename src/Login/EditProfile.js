import React, { Component } from "react";
import { Redirect } from "react-router";
import firebase from "../Firebase/FireBase.js";
import "./FormStyle.css";
import NavBar from "../NavBar/NavBar";
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader

function FavoritesCategeory(props) {
  // get the real category json from the DB

  let categories = [];
  let favorite;
  categories = props.categories;
  if (props.favoriteCat !== null && props.favoriteCat !== undefined)
    favorite = Object.values(props.favoriteCat);
  return (
    <div className="BigfavoritesCat">
      {categories.map((object, i) => {
        let strID = "ch" + i;
        let checked = false;
        if (props.favoriteCat !== null && props.favoriteCat !== undefined)
          if (favorite.includes(object.name)) checked = true;
        return (
          <div key={i} className="favoritesCat">
            <input
              type="checkbox"
              checked={checked}
              id={strID}
              value={object.name}
              onChange={props.func}
            />
            <label htmlFor={strID}>
              <img src={object.img} />
              <div className="textdivEdit">{object.name}</div>
            </label>
          </div>
        );
      })}
    </div>
  );
}

class EditProfile extends Component {
  constructor(props) {
    super(props);

    let end = false;
    let whyPhone = false;
    this.state = {
      id: props.location.state.user.id,
      email: props.location.state.user.email,
      name: props.location.state.user.name,
      phone: props.location.state.user.phone,
      img: props.location.state.user.img,
      favoriteCat: props.location.state.user.favoriteCat,
      listOfSignInClass: props.location.state.user.listOfSignInClass,
      progress: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.SetUser = this.SetUser.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  SetUser() {
    if (this.state.name == "" || this.state.phone == "") {
      alert("חובה למלא את השם והפלאפון");
      return;
    }

    firebase
      .database()
      .ref("/Users/" + this.state.id)
      .set(this.state);
    this.end = true;
    this.setState({});
  }

  handleChange(e) {
    if (e.target.type == "checkbox") {
      let i = e.target.id.substring(2);
      let tempFavoriteCat = [];
      if (
        this.state.favoriteCat !== null &&
        this.state.favoriteCat !== undefined
      )
        tempFavoriteCat = this.state.favoriteCat;
      if (tempFavoriteCat[i] == undefined) tempFavoriteCat[i] = e.target.value;
      else tempFavoriteCat[i] = null;
      this.setState({ favoriteCat: tempFavoriteCat });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    console.log(this.state.favoriteCat);
  }

  handleProgress = progress => this.setState({ progress: progress + "%" });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  handleUploadSuccess(filename) {
    firebase
      .storage()
      .ref("usersImg")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ img: url, progress: [] }));
  }

  render() {
    const divWidth = {
      maxWidth: "30%"
    };
    if (window.innerWidth < 500)
      // if it is phone set the width to 100%
      divWidth.maxWidth = "100%";
    return (
      <div>
        {this.end ? <Redirect to="/" /> : null}
        <NavBar edit="edit" location={this.props.location.pathname} />
        <hr />
        <div className="completeReg" style={divWidth}>
          <form>
            <h1>עריכת פרופיל</h1>
            <label>
              <div className="imguserc">
                <img className="user_e" src={this.state.img} />
                <div className="useret">{this.state.progress}שנה תמונה</div>
              </div>
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage().ref("usersImg")}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </label>
            <br />
            <label>
              שם מלא
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>

            <span
              className="whyPhone"
              onClick={() => {
                this.whyPhone = !this.whyPhone;
                this.setState({});
              }}
            >
              ?
            </span>
            {this.whyPhone ? (
              <div className="whyPhone">
                אנחנו לא רוצים את הפרטים שלך סתם, אל חשש אנחנו רוצים שלמארגני
                המפגש יהיה דרך לוודא שכולם מגיעים ולעדכן בפרטים
                <br />
                <span
                  className="whyPhoneGetIt"
                  onClick={() => {
                    this.whyPhone = false;
                    this.setState({});
                  }}
                >
                  הבנתי
                </span>
              </div>
            ) : null}

            <label>
              :הפלאפון שלך
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </label>
            <hr />
            <label>
              קטגוריות מועדפות
              <br />
              <span className="spanfavoriteCat">
                לפי זה נדע להראות את החוגים שהכי מתאימים לך
              </span>
              <FavoritesCategeory
                func={this.handleChange}
                categories={this.props.location.state.categoryList}
                favoriteCat={this.state.favoriteCat}
              />
            </label>
            <br />
            <h3 />
            <input
              className="registerbtn"
              type="button"
              value="שמור"
              onClick={this.SetUser}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
