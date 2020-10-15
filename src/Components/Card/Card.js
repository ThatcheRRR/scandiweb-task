import React, { useMemo, useEffect, useState } from 'react';
import './card.scss';

const Card = ({ num, width }) => {

  const [color, setColor] = useState(false);
  
  const handleClick = () => {
    setColor(prev => !prev)
  };

  const styles = useMemo(() => ({
    color: color ? 'red' : 'blue',
    width: width,
  }), [color]);

  return(
    <div onClick = {handleClick} style = {styles} className = 'swiper__card card'>Slide {num}</div>
  );
};

export default Card;
