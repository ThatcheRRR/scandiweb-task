import React, { useMemo } from 'react';
import './card.scss';

const Card = ({ num, width, pos }) => {
  const styles = useMemo(() => ({
    width: width,
  }), [width]);

  return(
    <div data-pos = {pos} style = {styles} className = 'swiper__card card'>Slide {num}</div>
  );
};

export default Card;
