import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import { game } from '@/store/game';
import { findAllByTestAttr } from '@/helpers/tests';

import WavyTitle from './WavyTitle';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('<WaveyTitle />', () => {
  const createStore = (gameState = game.hasPristineState) =>
    new Vuex.Store({
      state: {},
      getters: {
        gameState: () => gameState,
      },
    });

  const text = 'some.text';

  const mountComponent = (gameState = game.hasPristineState) =>
    shallowMount(WavyTitle, {
      mocks: {
        $t: key => key,
      },
      propsData: {
        translationPath: text,
      },
      store: createStore(gameState),
      localVue,
    });

  it(`should render elements with quantity equal to text length if game ${
    game.hasPristineState
  }`, () => {
    expect(findAllByTestAttr(mountComponent(), 'animated-letter')).toHaveLength(text.length);
  });

  it(`should render elements with quantity equal to text length if game ${
    game.hasIntroState
  }`, () => {
    expect(findAllByTestAttr(mountComponent(game.hasIntroState), 'animated-letter')).toHaveLength(
      text.length
    );
  });

  it(`should render elements with quantity equal to text length if game ${
    game.hasCountingState
  }`, () => {
    expect(
      findAllByTestAttr(mountComponent(game.hasCountingState), 'animated-letter')
    ).toHaveLength(text.length);
  });

  it(`should not be rendered if game ${game.hasRunningState}`, () => {
    expect(
      findAllByTestAttr(mountComponent(game.hasRunningState), 'animated-letter').exists()
    ).toBe(false);
  });
});
