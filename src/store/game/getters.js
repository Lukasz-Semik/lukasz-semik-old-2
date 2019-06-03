export const names = {
  gameState: 'gameState',
  healthPoints: 'healthPoints',
  gameGold: 'gameGold',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.healthPoints]: state => state.healthPoints,
  [names.gameGold]: state => state.gameGold,
};
