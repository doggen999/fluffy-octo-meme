import React, { useReducer, useLayoutEffect } from 'react';

import initialState from './reducers/game_initial_state';
import { TIMEOUT_LENGTH_MS } from './configs/configs';

import game_reducer from './reducers/game_reducer';
import { clearTimeout, correctMatch, incorrectMatch } from './actions/actions';

import Header from './components/Header/Header';
import Board from './components/Board/Board';

import styles from './app.scss';

export const GameContext = React.createContext(initialState);

export const DispatchProvider = React.createContext(null);

export default () => {
  const [game, dispatch] = useReducer(game_reducer, initialState);

  const evaluate = () => {
    let match = true;
    const firstCardColor = game.cards[game.activeCards[0]].color;

    game.activeCards.forEach((cardIndex) => {
      if (game.cards[cardIndex].color !== firstCardColor) {
        match = false;
      }
    });

    return match;
  };

  useLayoutEffect(() => {
    if (game.timeout) {
      const match = evaluate();
      if (match) {
        dispatch(correctMatch);
      } else {
        dispatch(incorrectMatch);
      }
      setTimeout(() => {
        dispatch(clearTimeout(match));
      }, TIMEOUT_LENGTH_MS);
    }
  }, [game.timeout]);
  
  return (
    <DispatchProvider.Provider value={dispatch}>
      <GameContext.Provider value={game}>
        <div className={styles.app}>
          <Header />
          <Board />
        </div>
      </GameContext.Provider>
    </DispatchProvider.Provider>
  );
};
