import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class NavBar extends Component {
  
  
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <Router>
        <div>
        <Link to="/login"  target="_blank">log in</Link>
        </div>
        </Router>
      );
  }

}

export default NavBar;