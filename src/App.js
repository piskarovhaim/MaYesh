import React, { Component } from 'react';
import ManagePage from './ManagePage/ManagePage'
import NavBar from './NavBar/NavBar';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

class App extends Component {
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
        <Route path="/" render={()=>{return(<NavBar/>)}} />
        <Route path="/" exact="true" render={()=>{return(<ManagePage/>)}} />
      
    
    </Router>
    </div>
      );
  }

}

export default App;