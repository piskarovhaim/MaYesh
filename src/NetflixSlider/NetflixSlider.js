import React, { Component } from 'react';
import Slider from './components/NetflixSlider'
import './App.scss'

class NetflixSlider extends Component {
  constructor(props){
    super(props)
    this.state={
      classList:props.classList,
    }
  }
  render() {
    return (
      <div>
      {this.props.classList.length == 0 ? null :
      (<div className="app">
        <Slider>
          {this.props.classList.map((movie,i) => (
            <Slider.Item movie={movie} key={movie.name} type={this.props.type}>item1</Slider.Item>
          ))}
        </Slider>
      </div>) 
    }
    </div>
    );
  }
}

export default NetflixSlider;
