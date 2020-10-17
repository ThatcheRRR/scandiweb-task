import React from 'react';
import Slider from '../Slider';
import Pagination from '../Pagination';
import './app.scss';

const App = () => {
  const slidesCount = 5;

  return(
    <div className = 'wrapper'>
      <Slider slidesCount = {slidesCount} viewCount = {2} />
      <Pagination slidesCount = {slidesCount} />
    </div>
  )
};

export default App;
