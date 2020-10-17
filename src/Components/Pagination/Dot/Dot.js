import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCard } from '../../../redux/actions';
import './dot.scss';

const Dot = ({ pos }) => {
  const dispatch = useDispatch();
  const currentCard = useSelector(state => state.currentCard);
  let activeClassName = '';

  const handleClick = () => {
    dispatch(changeCard(pos));
  };

  if(pos === currentCard) {
    activeClassName = 'dot--active';
  }

  return(
    <div onClick = {handleClick} className = {`pagination__dot dot ${activeClassName}`}></div>
  );
};

export default Dot;
