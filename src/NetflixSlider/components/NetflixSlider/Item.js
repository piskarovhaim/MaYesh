import React from 'react';
import cx from 'classnames';
import SliderContext from './context'
import ShowDetailsButton from './ShowDetailsButton'
import Mark from './Mark'
import './Item.scss'

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.name === movie.name;
      let date = new Date(movie.date);
      return (
        <div
          ref={elementRef}
          className={cx('item', {
            'item--open': isActive,
          })}
        >
          <div className="gallerynetflix" onClick={() => onSelectSlide(movie)}>
        <img src={movie.imgUrl} className="classImg"/>
        <div className="textdivnetflix">
            {movie.name}
            <br/>
            {date.toLocaleDateString('en-GB')}
        </div>
        </div>
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
