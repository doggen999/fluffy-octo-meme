import React, { useCallback, useContext } from 'react';
import classnames from 'classnames';

import { DispatchProvider, GameContext } from '../../app';
import { cardTurned } from '../../actions/actions';

import styles from './card.scss';

export default ({ index }) => {
  const game = useContext(GameContext);
  const dispatch = useContext(DispatchProvider);

  const handleClick = useCallback(() => {
    if (!game.timeout) {
      dispatch(cardTurned(game.cards[index].index));
    }
  }, [game.timeout]);

  const renderCard = () => {
    return game.activeCards.includes(index) ||
      game.displayedCards.includes(index)
      ? game.cards[index].color
      : 'X';
  };

  return (
    <div
      className={classnames(styles.card, {
        [styles.dimmed]: game.displayedCards.includes(index),
      })}
      onClick={handleClick}
    >
      {renderCard()}
    </div>
  );
};
