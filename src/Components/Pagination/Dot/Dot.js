import React from 'react';
import './dot.scss';

const Dot = ({ pos }) => {
  return(
    <div data-pos = {pos} className = 'pagination__dot dot'></div>
  );
};

export default Dot;
