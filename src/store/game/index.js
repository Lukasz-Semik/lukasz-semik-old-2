import getters, { names as gettersNames } from './getters';
import mutations, { names as mutationsNames } from './mutations';
import { game as gameStates } from './constants';

const state = {
  gameState: gameStates.hasPristineState,
};

export default {
  state,
  getters,
  mutations,
};

export const game = {
  ...gettersNames,
  ...mutationsNames,
  ...gameStates,
};
