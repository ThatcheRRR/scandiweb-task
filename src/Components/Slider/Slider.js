import React, { useEffect, useState, useRef, useReducer } from 'react';
import Card from '../Card';
import './slider.scss';

const Slider = () => {
  const sliderRef = useRef();
  const [count, setCount] = useState(5);
  const [viewCount, setViewCount] = useState(2);
  const [width, setWidth] = useState('auto');
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const arr = [];
    for(let i = 0; i < count; i++) {
      arr.push(i + 1);
    }

    setSlides(arr);
  }, [count]);

  useEffect(() => {
    const sliderWidth = parseInt(getComputedStyle(sliderRef.current).width);
    const viewWidth = sliderWidth / viewCount;
    setWidth(`${viewWidth}px`)
  }, [viewCount]);

  return(
    <section ref = {sliderRef} className = 'slider'>
      {slides.map((item, i) => {
        return(
          <Card key = {i} num = {item} width = {width} />
        )
      })}
    </section>
  )
};

export default Slider;
