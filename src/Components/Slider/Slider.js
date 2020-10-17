import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import { initApp, changeCard, windowResized } from '../../redux/actions';
import { button_styles } from './button-styles';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    const { initApp } = this.props;
    const slides = [];
    for(let i = 0; i < this.props.slidesCount; i++) {
      slides.push(
        <Card key = {i} num = {i + 1} />
      )
    }
    initApp(slides);
    window.addEventListener('resize', this.getSliderWidth);
    window.onload = this.getSliderWidth;
  }

  getSliderWidth = () => {
    let viewCount = 3;
    const sliderWidth = parseInt(getComputedStyle(this.sliderRef.current).width);
    if(sliderWidth > 501 && sliderWidth <= 768) {
      viewCount = 2;
    } else if(sliderWidth <= 500) {
      viewCount = 1;
    } else {
      viewCount = 3;
    }
    this.props.windowResized(sliderWidth, viewCount);
  };

  handleNext = () => {
    const { changeCard, currentCard, slidesCount, viewCount } = this.props;
    if(currentCard < slidesCount - viewCount) {
      const newCard = currentCard + 1;
      changeCard(newCard);
    } else {
      changeCard(0);
    }
  };

  handlePrev = () => {
    const { changeCard, currentCard, slidesCount, viewCount } = this.props;
    if(currentCard > 0) {
      const newCard = currentCard - 1;
      changeCard(newCard);
    } else {
      changeCard(slidesCount - viewCount);
    }
  };

  componentDidUpdate(prevProps) {
    if(prevProps.currentCard !== this.props.currentCard) {
      this.handleChangeCardNum();
    }
  }

  handleChangeCardNum = () => {
    const { currentCard, cardWidth } = this.props;
    this.sliderRef.current.style.transform = `translateX(-${cardWidth * currentCard}px)`;
  };

  render() {
    return(
      <>
      <button onClick = {this.handlePrev} style = {{...button_styles.common, ...button_styles.left}}>prev</button>
      <button onClick = {this.handleNext} style = {{...button_styles.common, ...button_styles.right}}>next</button>
        <section ref = {this.sliderRef} className = 'slider'>
          {this.props.slides}
        </section>
      </>
    )
  }
};

const mapStateToProps = state => ({
  slidesCount: state.slidesCount,
  viewCount: state.viewCount,
  currentCard: state.currentCard,
  cardWidth: state.cardWidth,
  slides: state.slides,
  sliderWidth: state.sliderWidth
});

const mapDispatchToProps = {
  initApp,
  changeCard,
  windowResized
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
