import initialState from './game_initial_state';
import * as types from '../consts/types';
import enums from '../enums/enums';
import { NUMBER_OF_MATCHES_REQUIRED } from '../configs/configs';
import { randomizedCardsArray } from '../utils/utils';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET:
      return { ...initialState, cards: randomizedCardsArray() };
    case types.CARD_TURNED:
      const newActiveCards = [
        ...new Set([...state.activeCards, action.payload]),
      ];
      const newState = {
        ...state,
        activeCards: newActiveCards,
        progress: enums.INPROGRESS,
      };
      return {
        ...newState,
        timeout:
          newState.activeCards.length === NUMBER_OF_MATCHES_REQUIRED
            ? true
            : false,
      };
    case types.CORRECT_MATCH:
      return {
        ...state,
        points: state.points + 1,
      };
    case types.INCORRECT_MATCH:
      return {
        ...state,
        points: state.points - 1,
      };
    case types.CLEAR_TIMEOUT:
      return {
        ...state,
        timeout: false,
        displayedCards: action.payload
          ? [...state.displayedCards, ...state.activeCards]
          : state.displayedCards,
        activeCards: [],
      };
    default:
      throw new Error(`Action "${action.type}" is unknown`);
  }
};
