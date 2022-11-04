import initialState from './game_initial_state';
import * as types from '../consts/types'
import enums  from '../enums/enums';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RESET:
      return initialState;
    case types.CARD_TURNED:
      return {
        ...state,
        activeCards: [...state.activeCards, action.payload],
        progress: enums.INPROGRESS 
      };
    case types.CORRECT_MATCH:
      return {
        ...state,
        activeCards: [],
        displayedCards: state.activeCards,
        points: state.points + 1,
      };
    case types.INCORRECT_MATCH:
      return {
        ...state,
        activeCards: {},
        points: points - 1,
      };
    default:
      throw new Error(`Action "${action.type}" is unknown`);
  }
};
