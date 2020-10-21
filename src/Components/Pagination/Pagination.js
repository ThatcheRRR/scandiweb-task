import React from 'react';
import { useSelector } from 'react-redux';
import Dot from './Dot';
import './pagination.scss';

const Pagination = ({ currentCard, changeCurrentCard }) => {
  const viewCount = useSelector(state => state.viewCount);
  const slidesCount = useSelector(state => state.slidesCount);
  const arr = [];

  for(let i = 0; i < slidesCount - viewCount + 1; i++) {
    arr.push(<Dot key = {i} pos = {i} currentCard = {currentCard} changeCurrentCard = {changeCurrentCard} />)
  }

  return(
    <div className = 'pagination'>
      {arr}
    </div>
  );
};

export default Pagination;