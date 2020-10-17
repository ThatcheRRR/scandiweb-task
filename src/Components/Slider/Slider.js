import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import { initApp, changeCard } from '../../redux/actions';
import { button_styles } from './button-styles';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    const { initApp } = this.props;
    const arr = [];
    for(let i = 0; i < this.props.slidesCount; i++) {
      arr.push(
        <Card pos = {i} key = {i} num = {i + 1} />
      )
    }
    initApp(arr);
  }

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
    const { currentCard } = this.props;
    this.sliderRef.current.style.transform = `translateX(-${600 * currentCard}px)`;
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
  slides: state.slides
});

const mapDispatchToProps = {
  initApp,
  changeCard
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
