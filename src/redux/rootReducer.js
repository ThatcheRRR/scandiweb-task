import {INIT, CHANGE_CARD} from './types';

const initialState = {
  slidesCount: 7,
  viewCount: 2,
  currentCard: 0,
  cardWidth: 0,
  slides: []
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case INIT:
      return {...state, slides: action.slides, cardWidth: action.cardWidth};
    case CHANGE_CARD:
      return {...state, currentCard: action.newCard};
  }
  return state;
}
