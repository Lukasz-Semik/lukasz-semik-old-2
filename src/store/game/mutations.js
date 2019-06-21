import { game, initialState } from './constants';

export const names = {
  setGameIntroState: 'setGameIntroState',
  setGameCountingState: 'setGameCountingState',
  setGameRunningState: 'setGameRunningState',
  substractHealthPoints: 'substractHealthPoints',
  // TODO: make more valid version
  updateGameStatistics: 'updateGameStatistics',
  setIsGamePaused: 'setIsGamePaused',
  restartGame: 'restartGame',
};

export default {
  [names.setGameIntroState]: state => {
    state.gameState = game.hasIntroState;
  },
  [names.setGameCountingState]: state => {
    state.gameState = game.hasCountingState;
  },
  [names.restartGame]: state => {
    const newState = {
      ...initialState,
      isGamePaused: false,
      gameState: game.hasCountingState,
    };

    Object.assign(state, newState);
  },
  [names.setGameRunningState]: state => {
    state.gameState = game.hasRunningState;
  },
  [names.setIsGamePaused]: (state, isGamePaused) => {
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
