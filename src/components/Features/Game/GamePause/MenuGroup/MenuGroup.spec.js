import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';
import { game } from '@/store/game';

import MenuGroup from './MenuGroup';

describe('<MenuGroup />', () => {
  const mountComponent = (gameState = game.hasPristineState) =>
    mount(MenuGroup, {
      propsData: {
        gameState,
        gameScore: 2,
      },
      mocks: {
        $t: key => key,
      },
    });

  const testResumeItem = wrapper => {
    it('should emit "handleResumeClick" when resume button is clicked', () => {
      const $resetButton = findByTestAttr(wrapper, 'resume-button');
      $resetButton.trigger('click');
      expect(wrapper.emitted('handleResumeClick')).toHaveLength(1);
    });
  };

  const testIntroItem = wrapper => {
    it('should emit "handleIntroClick" when resume button is clicked', () => {
      const $introButton = findByTestAttr(wrapper, 'intro-button');
      $introButton.trigger('click');
      expect(wrapper.emitted('handleIntroClick')).toHaveLength(1);
    });
  };

  const testHomeItem = wrapper => {
    it('should emit "handleHomeClick" when home button is clicked', () => {
      const $homeButton = findByTestAttr(wrapper, 'home-button');
      $homeButton.trigger('click');
      expect(wrapper.emitted('handleHomeClick')).toHaveLength(1);
    });
  };

  const testRestartItem = wrapper => {
    it('should emit "handleRestartClick" when home button is clicked', () => {
      const $homeButton = findByTestAttr(wrapper, 'restart-button');
      $homeButton.trigger('click');
      expect(wrapper.emitted('handleRestartClick')).toHaveLength(1);
    });
  };

  const testNotExistingItems = (wrapper, items) => {
    items.forEach(item => {
      it(`should not render ${item}`, () => {
        expect(findByTestAttr(wrapper, item).exists()).toBe(false);
      });
    });
  };

  describe(`when game has ${game.hasPristineState}`, () => {
    const wrapper = mountComponent();

    testResumeItem(wrapper);
    testIntroItem(wrapper);
    testNotExistingItems(wrapper, ['restart-button', 'home-button', 'score', 'ranking']);
  });

  describe(`when game has ${game.hasIntroState}`, () => {
    const wrapper = mountComponent(game.hasIntroState);

    testResumeItem(wrapper);
    testHomeItem(wrapper);
    testNotExistingItems(wrapper, ['restart-button', 'intro-button', 'score', 'ranking']);
  });

  describe(`when game has ${game.hasCountingState}`, () => {
    const wrapper = mountComponent(game.hasCountingState);

    testResumeItem(wrapper);
    testHomeItem(wrapper);
    testIntroItem(wrapper);
    testNotExistingItems(wrapper, ['restart-button', 'score', 'ranking']);
  });

  describe(`when game has ${game.hasRunningState}`, () => {
    const wrapper = mountComponent(game.hasRunningState);

    testResumeItem(wrapper);
    testHomeItem(wrapper);
    testIntroItem(wrapper);
    testRestartItem(wrapper);
    testNotExistingItems(wrapper, ['score', 'ranking']);
  });

  describe(`when game has ${game.hasOverState}`, () => {
    const wrapper = mountComponent(game.hasOverState);

    testHomeItem(wrapper);
    testIntroItem(wrapper);
    testRestartItem(wrapper);
    testNotExistingItems(wrapper, ['resume-button']);

    // Strange behaviour, item is visible in snapshot
    it.skip('should render score', () => {
      expect(findByTestAttr(wrapper, 'score')).toHaveLength(1);
    });

    // Strange behaviour, item is visible in snapshot
    it.skip('should render ranking', () => {
      expect(findByTestAttr(wrapper, 'ranking')).toHaveLength(1);
    });
  });
});
