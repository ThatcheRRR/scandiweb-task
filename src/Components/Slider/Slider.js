import React from 'react';
import Card from '../Card';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: 0,
      cardWidth: 0,
      slides: []
    }

    this.sliderRef = React.createRef();
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  componentDidMount() {
    const arr = [];
    for(let i = 0; i < this.props.slidesCount; i++) {
      arr.push(
        <Card pos = {i} key = {i} num = {i + 1} />
      )
    }
    this.setState({ slides: arr });
  }

  handleNext = () => {
    if(this.state.currentCard < this.props.slidesCount - this.props.viewCount) {
      const newCard = this.state.currentCard + 1;

      this.setState({ currentCard: newCard }, () => {
        this.sliderRef.current.style.transform = `translateX(-${600 * this.state.currentCard}px)`;
      });
    } else {
      this.setState({ currentCard: 0 }, () => {
        this.sliderRef.current.style.transform = `translateX(-${600 * this.state.currentCard}px)`;
      });
    }
  };

  handlePrev = () => {
    if(this.state.currentCard > 0) {
      const newCard = this.state.currentCard - 1;

      this.setState({ currentCard: newCard }, () => {
        this.sliderRef.current.style.transform = `translateX(-${600 * this.state.currentCard}px)`;
      });
    } else {
      this.setState({ currentCard: this.props.slidesCount - this.props.viewCount }, () => {
        this.sliderRef.current.style.transform = `translateX(-${600 * this.state.currentCard}px)`;
      });
    }
  };

  render() {
    return(
      <>
      <button onClick = {this.handlePrev} style = {{...buttons.common, ...buttons.left}}>prev</button>
      <button onClick = {this.handleNext} style = {{...buttons.common, ...buttons.right}}>next</button>
        <section ref = {this.sliderRef} className = 'slider'>
          {this.state.slides}
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

export default Slider;
