import { game } from './constants';

export const names = {
  setGameIntroState: 'setGameIntroState',
  setGameCountingState: 'setGameCountingState',
  setGameRunningState: 'setGameRunningState',
  substractHealthPoints: 'substractHealthPoints',
  // TODO: make more valid version
  updateGameStatistics: 'updateGameStatistics',
  setGameIsPaused: 'setGameIsPaused',
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
  [names.setGameIsPaused]: (state, isGamePaused) => {
    state.isGamePaused = isGamePaused;
  },
  [names.substractHealthPoints]: state => {
    if (state.healthPoints === 1) {
      // state.gameState = game.hasOverState;
    }

    // state.healthPoints--;
    state.healthPoints -= 5;
  },
  [names.updateGameStatistics]: state => {
    const newGameScore = state.gameScore + 1;

    if (newGameScore % 5 === 0) {
      state.gameGold++;
    }

    state.gameScore = newGameScore;
  },
};
