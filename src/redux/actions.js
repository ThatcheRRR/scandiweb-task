import { WINDOW_RESIZED } from './types';

export const windowResized = (sliderWidth, viewCount) => {
  return {
    type: WINDOW_RESIZED,
    sliderWidth,
    viewCount
  }
}
