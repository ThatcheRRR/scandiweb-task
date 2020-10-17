import React from 'react';
import { useDispatch } from 'react-redux';
import { changeCard } from '../../../redux/actions';
import './dot.scss';

const Dot = ({ pos }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeCard(pos));
  };

  return(
    <div onClick = {handleClick} data-pos = {pos} className = 'pagination__dot dot'></div>
  );
};

export default Dot;
