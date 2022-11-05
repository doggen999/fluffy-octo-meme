import reducer from './game_reducer';
import initialState from './game_initial_state';
import * as actions from '../actions/actions';
import enums from '../enums/enums';

import {
  NUMBER_OF_MATCHES_REQUIRED,
} from '../configs/configs';

const card = { color: 'red', index: 0 };
const cardIndex = 0;
const intermediateState = {
  ...initialState,
  activeCards: [0],
  progress: enums.INPROGRESS,
};

const matchingState = {
  ...intermediateState,
  cards: [
    card,
    { ...card, index: 1 },
    { ...card, index: 2 },
    { ...card, index: 3 },
  ],
  activeCards: [0, 1],
};

describe('game reducer', () => {
  it('should return error on undefined action', () => {
    expect(() => {
      reducer({}, undefined);
    }).toThrow();
  });

  it('action "reset" should return the initial state but with a new cards array', () => {
    expect(reducer({}, actions.reset)).not.toEqual(initialState);
  });

  it('should add a turned card to state', () => {
    expect(reducer(initialState, actions.cardTurned(cardIndex))).toEqual({
      ...initialState,
      activeCards: [cardIndex],
      progress: enums.INPROGRESS,
    });
  });

  it('should add 2nd turned card to state', () => {
    const shouldTimeout =
      [...intermediateState.activeCards, 1].length >=
      NUMBER_OF_MATCHES_REQUIRED;
    expect(reducer(intermediateState, actions.cardTurned(1))).toEqual({
      ...intermediateState,
      activeCards: [...intermediateState.activeCards, 1],
      progress: enums.INPROGRESS,
      timeout: shouldTimeout,
    });
  });

  it('should only add unique cards to evaluate', () => {
    expect(reducer(intermediateState, actions.cardTurned(cardIndex))).toEqual({
      ...intermediateState,
      timeout:
        intermediateState.activeCards.length === NUMBER_OF_MATCHES_REQUIRED
          ? true
          : false,
    });
  });

  it('should activate timeout when last card to evaluate is chosen', () => {
    const activeCards = new Array(NUMBER_OF_MATCHES_REQUIRED - 1)
      .fill()
      .map((_, i) => ({ ...card, index: i }));
    const expectedState = {
      ...intermediateState,
      activeCards: [...activeCards, cardIndex],
      timeout: true,
    };
    expect(
      reducer(
        { ...intermediateState, activeCards },
        actions.cardTurned(cardIndex)
      )
    ).toEqual(expectedState);
  });

  it('should clear timeout and display correct matches after given time', () => {
    const expectedState = {
      ...matchingState,
      timeout: false,
      activeCards: [],
      displayedCards: [...matchingState.activeCards],
    };
    expect(reducer(matchingState, actions.clearTimeout(true))).toEqual(
      expectedState
    );
  });

  it('should clear timeout and hide incorrect matches after given amount of time', () => {
    expect(reducer(matchingState, actions.clearTimeout(false))).toEqual({
      ...matchingState,
      displayedCards: [],
      activeCards: []
    });
  });

  it('should handle a correct match', () => {
    const expectedState = {
      ...matchingState,
      points: matchingState.points + 1,
    };
    expect(reducer(matchingState, actions.correctMatch)).toEqual(expectedState);
  });

  it('should handle an incorrect match', () => {
    const expectedState = {
      ...matchingState,
      points: matchingState.points - 1,
    };
    expect(reducer(matchingState, actions.incorrectMatch)).toEqual(
      expectedState
    );
  });

  it('should finalize game when last correct match is found', () => {
    const startState = {
      ...matchingState,
      cards: [card, { ...card, index: 1 }],
      progress: enums.INPROGRESS,
    };
    const expectedState = {
      ...startState,
      points: startState.points + 1,
    };
    expect(reducer(startState, actions.correctMatch)).toEqual(expectedState);
  });
});
