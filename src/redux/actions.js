import { INIT, CHANGE_CARD, WINDOW_RESIZED } from './types';

export const initApp = (slides) => {
  return{
    type: INIT,
    slides
  }
};

export const changeCard = (newCard) => {
  return{
    type: CHANGE_CARD,
    newCard
  }
};

export const windowResized = (sliderWidth, viewCount) => {
  return{
    type: WINDOW_RESIZED,
    sliderWidth,
    viewCount
  }
}
