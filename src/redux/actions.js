import { INIT, CHANGE_CARD } from './types';

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
