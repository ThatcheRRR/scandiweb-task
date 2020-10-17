import React from 'react';
import Slider from '../Slider';
import Pagination from '../Pagination';
import './app.scss';

const App = () => {
  return(
    <div className = 'wrapper'>
      <Slider />
      <Pagination />
    </div>
  )
};

export default App;
