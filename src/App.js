import React, { Component } from 'react';
import Database from './Firebase/DataBase.js';


class App extends Component {
  
  
  constructor(props) {
    super(props);
    
    this.AddCategory = this.AddCategory.bind(this);

  }

  AddCategory() {
    const DB = new Database();

    DB.AddCategory("fdfdsf");
  }
  render() {
    return <button onClick={this.AddCategory}>AddCategory</button>;
  }

}

export default App;