import getters, { names as gettersNames } from './getters';

const state = {
  gameState: 'pristine',
};

export default {
  state,
  getters,
  ...gettersNames,
};
