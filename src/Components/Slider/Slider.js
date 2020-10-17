import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import { initApp, changeCard, windowResized } from '../../redux/actions';
import { button_styles } from './button-styles';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPos: null,
      isClicked: false,
      transform: 0,
      diff: 0
    };
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
    window.addEventListener('load', this.getSliderWidth);
    if (window.PointerEvent) {
      window.addEventListener('pointerdown', this.pointerStart);
      window.addEventListener('pointermove', this.pointerMove);
      window.addEventListener('pointerup', this.pointerEnd);  
    } else {
      window.addEventListener('touchdown', this.pointerStart);
      window.addEventListener('touchmove', this.pointerMove);
      window.addEventListener('touchup', this.pointerEnd);  
      window.addEventListener('mousedown', this.pointerStart);
      window.addEventListener('mousemove', this.pointerMove);
      window.addEventListener('mouseup', this.pointerEnd);  
    }
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
  }

  handleNext = () => {
    const { changeCard, currentCard, slidesCount, viewCount } = this.props;
    if(currentCard < slidesCount - viewCount) {
      const newCard = currentCard + 1;
      changeCard(newCard);
    } else {
      changeCard(0);
    }
  }

  handlePrev = () => {
    const { changeCard, currentCard, slidesCount, viewCount } = this.props;
    if(currentCard > 0) {
      const newCard = currentCard - 1;
      changeCard(newCard);
    } else {
      changeCard(slidesCount - viewCount);
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.currentCard !== this.props.currentCard) {
      this.handleChangeCardNum();
    }
  }

  handleChangeCardNum = () => {
    const { currentCard, cardWidth } = this.props;
    this.sliderRef.current.style.transform = `translateX(-${cardWidth * currentCard}px)`;
  }

  pointerStart = (e) => {
    const transformMatrix = getComputedStyle(this.sliderRef.current).transform;
    if (transformMatrix) {
      this.setState({ transform: parseInt(transformMatrix.split(',')[4].trim()) });
    }
    this.setState({ isClicked: true, initialPos: e.clientX });
  }

  pointerMove = (e) => {
    e.preventDefault();
    const { isClicked, initialPos, transform } = this.state;
    if(isClicked) {
      const currentPos = e.clientX;
      const diff = currentPos - initialPos;
      this.sliderRef.current.style.transform = `translateX(${transform + diff}px)`;
      this.setState({ diff });
    }
  }

  pointerEnd = () => {
    const { diff } = this.state;
    const { cardWidth, currentCard, slidesCount, viewCount, changeCard } = this.props;
    this.setState({ isClicked: false });
    if(diff > cardWidth / 5) {
      if(currentCard === 0) {
        changeCard(slidesCount - viewCount);
      } else {
        changeCard(currentCard - 1);
      }
    } else {
      this.handleChangeCardNum();
    }

    if(diff < -(cardWidth / 5)) {
      if(currentCard === slidesCount - viewCount) {
        changeCard(0);
      } else {
        changeCard(currentCard + 1);
      }
    } else {
      this.handleChangeCardNum();
    }
  }

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
