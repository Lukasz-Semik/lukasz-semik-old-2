export const names = {
  gameState: 'gameState',
  isGamePristineState: 'isGamePristineState',
  isPreGameState: 'isPreGameState',
  isGameRunningState: 'isGameRunningState',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.isGamePristineState]: state => state.gameState === 'pristine',
  [names.isPreGameState]: state => state.gameState === 'pre-game',
  [names.isGameRunningState]: state => state.gameState === 'running',
};
