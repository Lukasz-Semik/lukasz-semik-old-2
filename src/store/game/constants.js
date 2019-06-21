export const game = {
  hasPristineState: 'hasPristineState',
  hasIntroState: 'hasIntroState',
  hasCountingState: 'hasCountingState',
  hasRunningState: 'hasRunningState',
  hasOverState: 'hasOverState',
};

export const initialState = {
  gameState: game.hasRunningState,
  healthPoints: 100,
  isGamePaused: false,
  gameGold: 0,
  gameScore: 0,
};
