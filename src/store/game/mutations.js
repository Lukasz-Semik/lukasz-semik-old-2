import { game } from './constants';

export const names = {
  setGameIntroState: 'setGameIntroState',
  setGameCountingState: 'setGameCountingState',
  setGameRunningState: 'setGameRunningState',
  substractHealthPoints: 'substractHealthPoints',
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
  [names.substractHealthPoints]: state => {
    if (state.healthPoints === 1) {
      state.gameState = game.hasOverState;
    }

    state.healthPoints--;
  },
};
