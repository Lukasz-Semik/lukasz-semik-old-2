import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { game } from '@/store/game';
import { findByTestAttr } from '@/utils/tests';

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
          gameScore: () => 5,
          gameGold: () => 1,
        },
      }),
      localVue,
    });

  // TODO: add game over state!
  describe(`when game not ${game.hasRunningState}`, () => {
    it('should not exist', () => {
      expect(findByTestAttr(mountComponent(), 'health-bar').exists()).toBe(false);
    });

    it('should not exist', () => {
      expect(
        findByTestAttr(
          mountComponent({
            gameState: game.hasIntroState,
          }),
          'health-bar'
        ).exists()
      ).toBe(false);
    });

    it('should not exist', () => {
      expect(
        findByTestAttr(
          mountComponent({
            gameState: game.hasCountingState,
          }),
          'health-bar'
        ).exists()
      ).toBe(false);
    });
  });

  describe(`when game ${game.hasRunningState}`, () => {
    it('should show controls after mount animations', () => {
      const wrapper = mountComponent({ gameState: game.hasRunningState });
      const $controls = findByTestAttr(wrapper, 'controls-wrapper');

      expect($controls.classes()).toContain('controls-wrapper');
      expect($controls.classes()).not.toContain('is-visible');
      findByTestAttr(wrapper, 'wrapper').trigger('animationend');
      expect($controls.classes()).toContain('is-visible');
    });
  });
});
