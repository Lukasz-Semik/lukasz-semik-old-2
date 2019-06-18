export const names = {
  gameState: 'gameState',
  healthPoints: 'healthPoints',
  gameGold: 'gameGold',
  gameScore: 'gameScore',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.healthPoints]: state => state.healthPoints,
  [names.gameGold]: state => state.gameGold,
  [names.gameScore]: state => state.gameScore,
};
