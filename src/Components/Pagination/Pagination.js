import React from 'react';
import Dot from './Dot';
import './pagination.scss';

const Pagination = ({ slidesCount }) => {
  const arr = new Array(slidesCount).fill('');
  return(
    <div className = 'pagination'>
      {arr.map((_, i) => {
        return(
          <Dot pos = {i} key = {i} />
        );
      })}
    </div>
  );
};

export default Pagination;