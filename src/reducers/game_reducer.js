import initialState from './game_initial_state';
import * as types from '../consts/types';
import enums from '../enums/enums';
import { numberOfMatchesRequired } from '../configs/configs';

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.RESET:
      return initialState;
    case types.CARD_TURNED:
      const newActiveCards = [...new Set([...state.activeCards, action.payload])];
      newState = {
        ...state,
        activeCards: newActiveCards,
        progress: enums.INPROGRESS,
      };
      return {
        ...newState,
        timeout:
          newState.activeCards.length === numberOfMatchesRequired
            ? true
            : false,
      };
    case types.CORRECT_MATCH:
      newState = {
        ...state,
        activeCards: [],
        displayedCards: [...state.displayedCards, ...state.activeCards],
        points: state.points + 1,
      };
      return {
        ...newState,
        progress:
          newState.displayedCards.length === newState.cards.length
            ? enums.FINISHED
            : newState.progress,
      };
    case types.INCORRECT_MATCH:
      return {
        ...state,
        activeCards: [],
        points: state.points - 1,
      };
    default:
      throw new Error(`Action "${action.type}" is unknown`);
  }
};
