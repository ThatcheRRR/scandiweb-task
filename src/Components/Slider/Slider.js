import React from 'react';
import { connect } from 'react-redux';
import Pagination from '../Pagination';
import Button from '../Button';
import { windowResized } from '../../redux/actions';
import './slider.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPos: null,
      isClicked: false,
      transform: 0,
      diff: 0,
      currentCard: 0
    };
    this.sliderRef = React.createRef();
    this.changeCurrentCard = this.changeCurrentCard.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const sliderBlock = this.sliderRef.current;
    window.addEventListener('resize', this.getSliderWidth);
    window.addEventListener('load', this.getSliderWidth);
    if (window.PointerEvent) {
      sliderBlock.addEventListener('pointerdown', this.pointerStart);
      sliderBlock.addEventListener('pointermove', this.pointerMove);
      sliderBlock.addEventListener('pointerup', this.pointerEnd);  
    } else {
      sliderBlock.addEventListener('touchstart', this.pointerStart);
      sliderBlock.addEventListener('touchmove', this.pointerMove);
      sliderBlock.addEventListener('touchend', this.pointerEnd);  
      sliderBlock.addEventListener('mousedown', this.pointerStart);
      sliderBlock.addEventListener('mousemove', this.pointerMove);
      sliderBlock.addEventListener('mouseup', this.pointerEnd);  
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
    const { slidesCount, viewCount } = this.props;
    const { currentCard } = this.state;
    if(currentCard < slidesCount - viewCount) {
      const newCard = currentCard + 1;
      this.setState({ currentCard: newCard });
    } else {
      this.setState({ currentCard: 0 });
    }
  }

  handlePrev = () => {
    const { slidesCount, viewCount } = this.props;
    const { currentCard } = this.state;
    if(currentCard > 0) {
      const newCard = currentCard - 1;
      this.setState({ currentCard: newCard });
    } else {
      this.setState({ currentCard: slidesCount - viewCount });
    }
  }

  componentDidUpdate(_, prevState) {
    if(prevState.currentCard !== this.state.currentCard) {
      this.handleChangeCardNum();
    }
  }

  handleChangeCardNum = () => {
    const { currentCard } = this.state;
    const { cardWidth } = this.props;
    this.sliderRef.current.style.transform = `translateX(-${cardWidth * currentCard}px)`;
  }

  pointerStart = (e) => {
    const transformMatrix = getComputedStyle(this.sliderRef.current).transform;
    const newPos = e.clientX || e.touches[0].clientX;
    if (transformMatrix) {
      this.setState({ transform: parseInt(transformMatrix.split(',')[4].trim()) });
    }
    this.setState({ isClicked: true, initialPos: newPos });
  }

  pointerMove = (e) => {
    if(window.PointerEvent) {
      e.preventDefault();
    }
    const { isClicked, initialPos, transform } = this.state;
    if(isClicked) {
      const currentPos = e.clientX || e.touches[0].clientX;
      const diff = currentPos - initialPos;
      this.sliderRef.current.style.transform = `translateX(${transform + diff}px)`;
      this.setState({ diff });
    }
  }

  pointerEnd = () => {
    const { slidesCount, viewCount, cardWidth } = this.props;
    const { currentCard, diff } = this.state
    this.setState({ isClicked: false });
    if(diff > cardWidth / 5) {
      if(currentCard === 0) {
        this.setState({ currentCard: slidesCount - viewCount });
      } else {
        this.setState(prev => {
          return {
            currentCard: prev.currentCard - 1
          }
        });
      }
    } else {
      this.handleChangeCardNum();
    }

    if(diff < -(cardWidth / 5)) {
      if(currentCard === slidesCount - viewCount) {
        this.setState({ currentCard: 0 });
      } else {
        this.setState(prev => {
          return {
            currentCard: prev.currentCard + 1
          }
        });
      }
    } else {
      this.handleChangeCardNum();
    }
  }

  changeCurrentCard = (newCard) => {
    this.setState({ currentCard: newCard })
  }

  render() {
    return(
      <div className = 'wrapper'>
        <Button direction = 'prev' action = {this.handlePrev} />
        <Button direction = 'next' action = {this.handleNext} />
        <section ref = {this.sliderRef} className = 'slider'>
          {this.props.children}
        </section>
        <Pagination
          currentCard = {this.state.currentCard}
          changeCurrentCard = {this.changeCurrentCard}
        />
      </div>
    )
  }
};

const mapStateToProps = state => ({
  slidesCount: state.slidesCount,
  viewCount: state.viewCount,
  cardWidth: state.cardWidth
});

const mapDispatchToProps = dispatch => {
  return {
    windowResized: (...args) => dispatch(windowResized(...args))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
