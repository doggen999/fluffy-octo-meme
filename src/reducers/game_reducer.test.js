import reducer from './game_reducer';
import initialState from './game_initial_state';
import * as actions from '../actions/actions';
import enums from '../enums/enums';
import { numberOfMatchesRequired } from '../configs/configs';
import { number } from 'prop-types';

const card = { color: 'red', index: 0 };
const intermediateState = {
  ...initialState,
  activeCards: [card],
  progress: enums.INPROGRESS,
};
const matchingState = {
  ...intermediateState,
  activeCards: [card, { ...card, index: 1 }],
};

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
    expect(reducer(initialState, actions.cardTurned(card))).toEqual({
      ...initialState,
      activeCards: [card],
      progress: enums.INPROGRESS,
    });
  });

  it('should add 2nd turned card to state', () => {
    const result = reducer(intermediateState, actions.cardTurned(card));
    const shouldTimeout =
      [...intermediateState.activeCards, { ...card, index: 1 }].length >=
      numberOfMatchesRequired;
    expect(
      reducer(intermediateState, actions.cardTurned({ ...card, index: 1 }))
    ).toEqual({
      ...intermediateState,
      activeCards: [...intermediateState.activeCards, { ...card, index: 1 }],
      progress: enums.INPROGRESS,
      timeout: shouldTimeout,
    });
  });

  it('should only add unique cards to evaluate', () => {
    expect(reducer(intermediateState, actions.cardTurned(card))).toEqual(
      intermediateState
    );
  });

  it('should activate timeout when last card to evaluate is chosen', () => {
    const activeCards = new Array(numberOfMatchesRequired - 1)
      .fill()
      .map((_, i) => ({ ...card, index: i }));
    const expectedState = {
      ...intermediateState,
      activeCards: [...activeCards, card],
      timeout: true,
    };
    expect(
      reducer({ ...intermediateState, activeCards }, actions.cardTurned(card))
    ).toEqual(expectedState);
  });

  it('should handle a correct match', () => {
    const expectedState = {
      ...matchingState,
      points: matchingState.points + 1,
      activeCards: [],
      displayedCards: [...matchingState.activeCards],
    };
    expect(reducer(matchingState, actions.correctMatch)).toEqual(expectedState);
  });

  it('should handle an incorrect match', () => {
    const expectedState = {
      ...matchingState,
      points: matchingState.points - 1,
      activeCards: [],
      displayedCards: [],
    };
    expect(reducer(matchingState, actions.incorrectMatch)).toEqual(
      expectedState
    );
  });

  it('should finalize game when last correct match is found', () => {
    const startState = {
      ...matchingState,
      displayedCards: [
        { ...card, index: 2 },
        { ...card, index: 3 },
      ],
      cards: [
        card,
        { ...card, index: 1 },
        { ...card, index: 2 },
        { ...card, index: 3 },
      ],
      progress: enums.INPROGRESS,
    };
    const expectedState = {
      ...startState,
      displayedCards: [
        ...startState.displayedCards,
        card,
        { ...card, index: 1 },
      ],
      progress: enums.FINISHED,
      points: startState.points + 1,
      activeCards: [],
    };
    expect(reducer(startState, actions.correctMatch)).toEqual(expectedState);
  });
});
