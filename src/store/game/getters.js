import { gameStates } from './constants';

export const names = {
  hasGamePristineState: 'hasGamePristineState',
  hasGameIntroState: 'hasGameIntroState',
  hasGameCountingState: 'hasGameCountingState',
  hasGameRunningState: 'hasGameRunningState',
};

export default {
  [names.hasGamePristineState]: state => state.gameState === gameStates.pristine,
  [names.hasGameIntroState]: state => state.gameState === gameStates.intro,
  [names.hasGameCountingState]: state => state.gameState === gameStates.counting,
  [names.hasGameRunningState]: state => state.gameState === gameStates.running,
};
