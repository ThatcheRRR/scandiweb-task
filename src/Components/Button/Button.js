import React from 'react';
import './button.scss';

const Button = ({ direction, action }) => {
  return(
    <button onClick = {action} className = {`slider__button button button__${direction}`}>
      {direction}
    </button>
  );
};

export default Button;
