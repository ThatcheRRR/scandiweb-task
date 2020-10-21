import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './card.scss';

const Card = ({ children }) => {
  const cardWidth = useSelector(state => state.cardWidth);

  const styles = useMemo(() => ({
    width: cardWidth
  }), [cardWidth]);

  return(
    <div style = {styles} className = 'swiper__card card'>{children}</div>
  );
};

export default Card;
