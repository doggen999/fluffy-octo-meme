import React, { useContext } from 'react';

import { DispatchProvider, GameContext } from '../../app';
import { reset } from '../../actions/actions';
import enums from '../../enums/enums';

import styles from './Header.scss';

export default () => {
  const game = useContext(GameContext);
  const dispatch = useContext(DispatchProvider);

  const handleClick = () => {
    dispatch(reset);
  };
  return (
    <div className={styles.boardheader}>
      <div>{`Points: ${game.points}`}</div>
      <div>{game.timeout && 'TIMEOUT'}</div>
      <div>
        <button onClick={handleClick} disabled={game.progress === enums.NEW}>
          {game.progress === enums.FINISHED ? 'New' : 'Reset'}
        </button>
      </div>
    </div>
  );
};
