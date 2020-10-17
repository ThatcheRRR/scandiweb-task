import React from 'react';
import { useSelector } from 'react-redux';
import Dot from './Dot';
import './pagination.scss';

const Pagination = () => {
  const slidesCount = useSelector(state => state.slidesCount);
  const viewCount = useSelector(state => state.viewCount);
  const arr = [];

  for(let i = 0; i < slidesCount - viewCount + 1; i++) {
    arr.push(<Dot pos = {i} key = {i} />)
  }

  return(
    <div className = 'pagination'>
      {arr}
    </div>
  );
};

export default Pagination;