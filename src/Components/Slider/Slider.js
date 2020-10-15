import React, { useEffect, useState, useRef } from 'react';
import Card from '../Card';
import './slider.scss';

const Slider = () => {
  const sliderRef = useRef();
  const [count, setCount] = useState(5);
  const [viewCount, setViewCount] = useState(2);
  const [width, setWidth] = useState('auto');
  const [slides, setSlides] = useState([]);
  const [prevPos, setPrevPos] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [transform, setTransform] = useState(0);

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

  const handleDown = (e) => {
    e.persist();
    setPrevPos(e.clientX);
    setClicked(true);
    const transformMatrix = window.getComputedStyle(sliderRef.current).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
      setTransform(parseInt(transformMatrix.split(',')[4].trim()));
    }
  };

  const handleMove = (e) => {
    e.persist();
    if (clicked) {
      const currentPosition = e.clientX;
      const diff = currentPosition - prevPos;
      sliderRef.current.style.transform = `translateX(${transform + diff}px)`;  
    }
  };

  const handleOut = (e) => {
    setClicked(false);
  }

  return(
    <section onPointerDown = {handleDown} onPointerMove = {handleMove} onPointerUp = {handleOut} ref = {sliderRef} className = 'slider'>
      {slides.map((item, i) => {
        return(
          <Card key = {i} num = {item} width = {width} />
        )
      })}
    </section>
  )
};

export default Slider;
