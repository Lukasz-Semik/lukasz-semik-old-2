import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { game } from '@/store/game';
import { findByTestAttr } from '@/helpers/tests';

import GamePanel from './GamePanel';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<GamePanel/>', () => {
  const mountComponent = ({ gameState = game.hasPristineState, healthPoints = 100 } = {}) =>
    shallowMount(GamePanel, {
      store: new Vuex.Store({
        getters: {
          gameState: () => gameState,
          healthPoints: () => healthPoints,
        },
      }),
      localVue,
    });

  describe(`when game not ${game.hasRunningState}`, () => {
    const wrapper = mountComponent();

    it('should not exist', () => {
      expect(findByTestAttr(wrapper, 'health-bar').exists()).toBe(false);
    });
  });

  describe(`when game ${game.hasRunningState}`, () => {
    it('should have green background and 100% width', () => {
      const wrapper = mountComponent({ gameState: game.hasRunningState });

      const $healthBar = findByTestAttr(wrapper, 'health-bar');
      expect($healthBar.classes()).not.toContain('is-yellow');
      expect($healthBar.classes()).not.toContain('is-red');
      expect($healthBar.attributes('style')).toBe('width: 100%;');
    });

    it('should have green background and 59% width', () => {
      const hp = 59;
      const wrapper = mountComponent({ gameState: game.hasRunningState, healthPoints: hp });

      const $healthBar = findByTestAttr(wrapper, 'health-bar');
      expect($healthBar.classes()).toContain('is-yellow');
      expect($healthBar.classes()).not.toContain('is-red');
      expect($healthBar.attributes('style')).toBe(`width: ${hp}%;`);
    });

    it('should have green background and 29% width', () => {
      const hp = 29;
      const wrapper = mountComponent({ gameState: game.hasRunningState, healthPoints: hp });

      const $healthBar = findByTestAttr(wrapper, 'health-bar');
      expect($healthBar.classes()).toContain('is-yellow');
      expect($healthBar.classes()).toContain('is-red');
      expect($healthBar.attributes('style')).toBe(`width: ${hp}%;`);
    });
  });
});
