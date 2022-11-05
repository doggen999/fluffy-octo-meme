import * as types from '../consts/types';

export const reset = {
  type: types.RESET,
};

export const cardTurned = (cardIndex) => ({
  type: types.CARD_TURNED,
  payload: cardIndex,
});

export const correctMatch = {
  type: types.CORRECT_MATCH,
};

export const incorrectMatch = {
  type: types.INCORRECT_MATCH,
};

export const clearTimeout = (isMatching) => ({
  type: types.CLEAR_TIMEOUT,
  payload: isMatching,
});
