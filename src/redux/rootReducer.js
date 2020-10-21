import { WINDOW_RESIZED } from './types';

const initialState = {
  sliderWidth: 0,
  slidesCount: 5,
  viewCount: 3,
  cardWidth: 0
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case WINDOW_RESIZED:
      const widthOfCard = action.sliderWidth / action.viewCount;
      return {...state, sliderWidth: action.sliderWidth, viewCount: action.viewCount, cardWidth: widthOfCard};
  }
  return state;
}
