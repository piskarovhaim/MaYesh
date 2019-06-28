import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Mark from './Mark'
import './Item.scss'
import { BrowserRouter as Router, Link } from "react-router-dom";
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Item = ({ movie,type,title }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.name === movie.name;
      let date = new Date(movie.date);
      let typeCategory = false;
      if(type == 'category'){
          typeCategory = true;
      }
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
        {typeCategory ? (
            <div className="gallerynetflixCategory">
            <Link to={{pathname: "/Category/" + movie.name, state:{category:movie}}}>
              <img src={movie.img} className="classImg"/>
              <div className="textdivnetflixCategory">
                  {movie.name}
                </div>
            </Link>
            </div>
        )
        :
        (
        <AnchorLink href={'#'+movie.name+title}>
            <div id={movie.name+title} className="gallerynetflix" onClick={() => onSelectSlide(movie)}>
            <img src={movie.imgUrl} className="classImg"/>
            <div className="textdivnetflix">
                {movie.name}
                <br/>
                {date.toLocaleDateString('en-GB')}
            </div>
            </div>
        </AnchorLink>)}

          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
