import Vuex from 'vuex';
import { TransitionStub, shallowMount, createLocalVue } from '@vue/test-utils';

import { game } from '@/store/game';
import { findByTestAttr } from '@/helpers/tests';

import StartCounter from './StartCounter';

const localVue = createLocalVue();

localVue.use(Vuex);

// TODO: learn about transition testing and back to this later
describe.skip('<StartCounter />', () => {
  const setGameRunningStateSpy = jest.fn();

  const wrapper = shallowMount(StartCounter, {
    store: new Vuex.Store({
      getters: {
        gameState: () => game.hasCountingState,
      },
      mutations: {
        setGameRunningState: setGameRunningStateSpy,
      },
    }),
    mocks: {
      $t: key => key,
    },
    stubs: {
      transition: TransitionStub,
    },
    localVue,
  });

  const $transitionWrapper = findByTestAttr(wrapper, 'transition-wrapper');
  $transitionWrapper.trigger('after-enter');

  it('should contain 3 item', () => {
    expect(findByTestAttr(wrapper, 'counter-3').exists()).toBe(false);
    expect(findByTestAttr(wrapper, 'counter-2').exists()).toBe(true);
    expect(findByTestAttr(wrapper, 'counter-1').exists()).toBe(false);
  });
});
