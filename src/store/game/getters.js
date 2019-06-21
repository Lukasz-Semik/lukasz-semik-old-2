export const names = {
  gameState: 'gameState',
  healthPoints: 'healthPoints',
  gameGold: 'gameGold',
  gameScore: 'gameScore',
  isGamePaused: 'isGamePaused',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.healthPoints]: state => state.healthPoints,
  [names.gameGold]: state => state.gameGold,
  [names.gameScore]: state => state.gameScore,
  [names.isGamePaused]: state => state.isGamePaused,
};
