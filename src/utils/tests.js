import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.use(Vuex);

export const generateTestGameVuex = ({
  getters = {
    isGamePaused: () => false,
  },
  mutations = {},
  actions = {},
  state = {},
} = {}) => ({
  localVue,
  store: new Vuex.Store({
    getters,
    mutations,
    actions,
    state,
  }),
});

export const findByTestAttr = (node, attrName) => node.find(`[data-test="${attrName}"]`);
export const findAllByTestAttr = (node, attrName) => node.findAll(`[data-test="${attrName}"]`);
