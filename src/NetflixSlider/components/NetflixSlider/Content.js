import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import { BrowserRouter as Router, Link } from "react-router-dom";

const Content = ({ movie, onClose }) => (
  <div className="content">
    <div className="content__background">
      <div className="content__background__shadow" />
      <div
        className="content__background__image"
        style={{ 'background-image': `url(${movie.imgUrl})` }}
      />
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.name}</div>
        <div className="content__description">
          {movie.description}
        </div>
        <div className="content__linktoclass">
        <Link to={"/Category/"+ movie.category +"/Class/"+movie.name}>
            קרא עוד
          </Link>
          </div>
      </div>
      <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
