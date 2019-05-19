import { game } from './constants';

export const names = {
  setGameIntroState: 'setGameIntroState',
  setGameCountingState: 'setGameCountingState',
  setGameRunningState: 'setGameRunningState',
};

export default {
  [names.setGameIntroState]: state => {
    state.gameState = game.hasIntroState;
  },
  [names.setGameCountingState]: state => {
    state.gameState = game.hasCountingState;
  },
  [names.setGameRunningState]: state => {
    state.gameState = game.hasRunningState;
  },
};
