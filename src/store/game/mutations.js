export const names = {
  setPreGameState: 'setPreGameState',
  setGameRunningState: 'setGameRunningState',
};

export default {
  [names.setPreGameState]: state => {
    state.gameState = 'pre-game';
  },
  [names.setGameRunningState]: state => {
    state.gameState = 'running';
  },
};
