import React, { useContext } from 'react';

import { GameContext } from '../../app';

import Card from '../Card/Card';
import styles from './Board.scss';

export default () => {
  const game = useContext(GameContext);
  return (
    <div className={styles.gameboard}>
      {game.cards.map((c) => (
        <Card key={c.index} index={c.index} />
      ))}
    </div>
  );
};
