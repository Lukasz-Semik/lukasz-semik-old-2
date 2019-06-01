export const names = {
  gameState: 'gameState',
  healthPoints: 'healthPoints',
  gameScore: 'gameScore',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.healthPoints]: state => state.healthPoints,
  [names.gameScore]: state => state.gameScore,
};
