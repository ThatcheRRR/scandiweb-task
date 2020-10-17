import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import { initApp, changeCard } from '../../redux/actions';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.sliderRef = React.createRef();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
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
    const newCard = currentCard + 1;
    changeCard(newCard);
    if(currentCard < slidesCount - viewCount) {
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
      <button onClick = {this.handlePrev} style = {{...buttons.common, ...buttons.left}}>prev</button>
      <button onClick = {this.handleNext} style = {{...buttons.common, ...buttons.right}}>next</button>
        <section ref = {this.sliderRef} className = 'slider'>
          {this.props.slides}
        </section>
      </>
    )
  }
};

const buttons = {
  common: {
    position: 'absolute',
    top: '0',
    width: '30px',
    height: '100%',
    outline: 'none',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '15'
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

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
