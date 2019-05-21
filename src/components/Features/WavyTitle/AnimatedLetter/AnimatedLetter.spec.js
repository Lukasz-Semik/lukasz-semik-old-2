import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { game } from '@/store/game';
import { findByTestAttr } from '@/helpers/tests';

import AnimatedLetter from './AnimatedLetter';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<AnimatedLetter>', () => {
  const createStore = (gameState = game.hasPristineState) =>
    new Vuex.Store({
      state: {},
      getters: {
        gameState: () => gameState,
      },
      mutations: undefined,
    });

  it('should render properly with index 0 and normal letter', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: 'a',
      },
      store: createStore(),
      localVue,
    });

    const animatedWrapper = findByTestAttr(wrapper, 'animated-letter');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 0s;');
    expect(animatedWrapper.classes()).toContain('wavy-move-animation');
  });

  it('should render properly without class for spaces', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: '  ',
      },
      store: createStore(),
      localVue,
    });

    const animatedWrapper = findByTestAttr(wrapper, 'animated-letter');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 0s;');
    expect(animatedWrapper.classes()).not.toContain('wavy-move-animation');
  });

  it('should render inner wrapper without is-fallen class if game.hasPristineState', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: 'a',
      },
      store: createStore(),
      localVue,
    });

    expect(findByTestAttr(wrapper, 'inner-wrapper').classes()).not.toContain('is-fallen');
  });

  it('should render inner wrapper with is-fallen class if game.hasIntroState', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: 'a',
      },
      store: createStore(game.hasIntroState),
      localVue,
    });

    expect(findByTestAttr(wrapper, 'inner-wrapper').classes()).toContain('is-fallen');
  });
});
