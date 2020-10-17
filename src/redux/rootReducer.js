import { INIT, CHANGE_CARD, WINDOW_RESIZED } from './types';

const initialState = {
  slidesCount: 7,
  viewCount: 3,
  currentCard: 0,
  cardWidth: 0,
  sliderWidth: 0,
  slides: []
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case INIT:
      return {...state, slides: action.slides};
    case CHANGE_CARD:
      return {...state, currentCard: action.newCard};
    case WINDOW_RESIZED:
      const widthOfCard = action.sliderWidth / action.viewCount;
      return {...state, sliderWidth: action.sliderWidth, cardWidth: widthOfCard, viewCount: action.viewCount};
  }
  return state;
}
