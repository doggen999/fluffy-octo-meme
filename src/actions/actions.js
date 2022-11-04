import * as types from '../consts/types'

export const reset = {
  type: types.RESET,
};

export const cardTurned = (card) => ({
  type: types.CARD_TURNED,
  payload: card,
});

export const correctMatch = {
  type: types.CORRECT_MATCH,
};

export const incorrectMatch = {
  type: types.INCORRECT_MATCH,
};
