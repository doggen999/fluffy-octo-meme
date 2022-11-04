import reducer from './game_reducer';
import initialState from './game_initial_state';
import * as actions from '../actions/actions';
import enums from '../enums/enums'

describe('game reducer', () => {
    it('should return error on undefined action', () => {
      expect(() => {
        reducer({}, undefined);
      }).toThrow();
    });

    it('action "reset" should return the initial state', () => {
      expect(reducer({}, actions.reset)).toEqual(initialState);
    });

    it('should add a turned card to state', () => {
      const card = { color: 'red', index: 0 };
      expect(reducer(initialState, actions.cardTurned(card))).toEqual({
        ...initialState,
        activeCards: [card],
        progress: enums.INPROGRESS
      });
    });

  it('should add 2nd turned card to state', () => {
    const card = { color: 'red', index: 0 };
    const intermediateState = { ...initialState, activeCards: [card] };
    expect(reducer(intermediateState, actions.cardTurned(card))).toEqual({
      ...initialState,
      activeCards: [...intermediateState.activeCards, card],
      progress: enums.INPROGRESS
    });
  });

  it('should handle a correct match', () => {
    const card = { color: 'red', index: 0 };
    const intermediateState = {
      ...initialState,
      activeCards: [card, { ...card, index: 1 }],
      progress: enums.INPROGRESS
    };
    expect(reducer(intermediateState, actions.correctMatch)).toEqual({
      ...intermediateState,
      points: intermediateState.points + 1,
      activeCards: [],
      displayedCards: [card, { ...card, index: 1 }],
    });
  });
});
