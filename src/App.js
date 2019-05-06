import React, { Component } from 'react';
import ManagePage from './ManagePage/ManagePage'
import NavBar from './NavBar/NavBar';


class App extends Component {
  
  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      <NavBar/>
    <ManagePage/>
    </div>
      );
  }

}

export default App;