import React from 'react';
import './dot.scss';

const Dot = ({ pos, currentCard, changeCurrentCard }) => {
  let activeClassName = '';

  if(pos === currentCard) {
    activeClassName = 'dot--active';
  }

  return(
    <div onClick = {() => changeCurrentCard(pos)} className = {`pagination__dot dot ${activeClassName}`}></div>
  );
};

export default Dot;
