export const names = {
  gameState: 'gameState',
  healthPoints: 'healthPoints',
};

export default {
  [names.gameState]: state => state.gameState,
  [names.healthPoints]: state => state.healthPoints,
};
