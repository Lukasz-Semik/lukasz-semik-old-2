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
  [names.restartGame]: (state, newGameState = game.hasCountingState) => {
    const newState = {
      ...initialState,
      gameState: newGameState,
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
    if (state.healthPoints <= 5) {
      state.gameState = game.hasOverState;
      state.isGamePaused = true;
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
