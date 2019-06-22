// TODO: improve mutations by state machine and add tests

import getters, { names as gettersNames } from './getters';
import mutations, { names as mutationsNames } from './mutations';
import { game as gameStates, initialState } from './constants';

export default {
  state: { ...initialState },
  getters,
  mutations,
};

export const game = {
  ...gettersNames,
  ...mutationsNames,
  ...gameStates,
};
