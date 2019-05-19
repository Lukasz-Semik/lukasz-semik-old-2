import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';
import { game } from '@/store/game';

import DropMain from './DropMain';

/*
  // TODO: write tests and adjust component when advanced Drop is ready.
  1.Pristine state,
*/
describe.skip('<DropMain />', () => {
  describe(`when game ${game.hasPristineState}`, () => {
    jest.useFakeTimers();

    const setGameIntroStateSpy = jest.fn();

    const wrapper = mount(DropMain, {
      propsData: {
        id: 'some-id',
        gameState: game.hasPristineState,
        setGameIntroState: setGameIntroStateSpy,
      },
    });

    const $dropWrapper = findByTestAttr(wrapper, 'drop-wrapper');
    const $swimWrapper = findByTestAttr(wrapper, 'swim-wrapper');

    it('should set visible class on drop-wrapper after timeout', () => {
      expect($dropWrapper.classes()).not.toContain('is-visible');

      jest.runAllTimers();

      expect($dropWrapper.classes()).toContain('is-visible');
    });

    it('should set is-swimming class on swim-wrapper when showing of drop is end', () => {
      expect($swimWrapper.classes()).not.toContain('is-swimming');

      $dropWrapper.trigger('animationend');

      expect($swimWrapper.classes()).toContain('is-swimming');
    });
  });
});
