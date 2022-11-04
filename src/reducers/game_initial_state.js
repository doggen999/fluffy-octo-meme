import GAMESTATE from '../enums/enums'

export default {
  points: 0,
  progress: GAMESTATE.NEW,
  cards: [],
  displayedCards: [],
  activeCards: [],
  timeout: false,
};
