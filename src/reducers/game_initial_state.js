import GAMESTATE from '../enums/enums';

import { randomizedCardsArray } from '../utils/utils';

export default {
  points: 0,
  progress: GAMESTATE.NEW,
  cards: randomizedCardsArray(),
  displayedCards: [],
  activeCards: [],
  timeout: false,
};
