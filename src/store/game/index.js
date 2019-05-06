import getters, { names as gettersNames } from './getters';
import mutations, { names as mutationsNames } from './mutations';

const state = {
  gameState: 'pristine',
};

export default {
  state,
  getters,
  mutations,
};

export const game = {
  ...gettersNames,
  ...mutationsNames,
};
