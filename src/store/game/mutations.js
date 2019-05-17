import { gameStates } from './constants';

export const names = {
  setGameIntroState: 'setGameIntroState',
  setGameCountingState: 'setGameCountingState',
  setGameRunningState: 'setGameRunningState',
};

export default {
  [names.setGameIntroState]: state => {
    state.gameState = gameStates.intro;
  },
  [names.setGameCountingState]: state => {
    state.gameState = gameStates.counting;
  },
  [names.setGameRunningState]: state => {
    state.gameState = gameStates.running;
  },
};
