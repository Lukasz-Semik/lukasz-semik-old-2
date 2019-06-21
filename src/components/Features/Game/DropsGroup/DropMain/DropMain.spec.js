import { mount } from '@vue/test-utils';
import { each } from 'lodash';

import { generateTestGameVuex, findByTestAttr } from '@/utils/tests';
import { game } from '@/store/game';

import DropMain from './DropMain';

// TODO: add tests for game.hasRunningState.

describe('<DropMain />', () => {
  const id = 'some-id';

  const buttonSelectors = ['main-button', 'secondary-button'];

  const mountComponent = ({ gameState = game.hasPristineState, setGameIntroStateSpy }) =>
    mount(DropMain, {
      propsData: {
        id,
        gameState,
        setGameIntroState: setGameIntroStateSpy,
      },
      ...generateTestGameVuex(),
    });

  describe(`when game ${game.hasPristineState}`, () => {
    describe('drop full lifecycle without click it', () => {
      const setGameIntroStateSpy = jest.fn();

      const wrapper = mountComponent({ setGameIntroStateSpy });

      const $showingWrapper = findByTestAttr(wrapper, 'showing-wrapper');
      const $swimWrapper = findByTestAttr(wrapper, 'swim-wrapper');

      it('should have "has-showing-animation" on showingWrapper', () => {
        expect($showingWrapper.classes()).toContain('has-showing-animation');
      });

      it('should set "is-swimming" class to swimWrapper when showing is end', () => {
        expect($swimWrapper.classes()).not.toContain('is-swimming');
        $showingWrapper.trigger('animationend');
        expect($swimWrapper.classes()).toContain('is-swimming');
      });

      it('should emit "handleSwimEnd" with id and is not hit flag when swimming ends', () => {
        $swimWrapper.trigger('animationend');
        expect(wrapper.emitted('handleSwimEnd')[0][0]).toEqual({
          id,
          isHit: false,
        });
      });
    });

    describe('drop full lifecycle with click main button', () => {
      each(buttonSelectors, buttonSelector => {
        describe(`clicking ${buttonSelector}`, () => {
          const setGameIntroStateSpy = jest.fn();

          const wrapper = mountComponent({ setGameIntroStateSpy });

          const $showingWrapper = findByTestAttr(wrapper, 'showing-wrapper');
          const $drop = findByTestAttr(wrapper, 'drop');
          const $swimWrapper = findByTestAttr(wrapper, 'swim-wrapper');
          const $button = findByTestAttr(wrapper, buttonSelector);

          it('should not invoke "setGameIntroStateSpy" and not hide if is not swimming', () => {
            $button.trigger('click');
            expect(setGameIntroStateSpy).not.toHaveBeenCalled();
            expect($drop.classes()).not.toContain('is-hidden');
            expect($drop.classes()).not.toContain('is-disabled');
          });

          it('should hide drop and invoke "setGameIntroStateSpy"', () => {
            $showingWrapper.trigger('animationend');
            $button.trigger('click');
            expect(setGameIntroStateSpy).toHaveBeenCalled();
            expect($drop.classes()).toContain('is-hidden');
            expect($drop.classes()).toContain('is-disabled');
          });

          it('should emit with is hit flag "handleSwimEnd" when swimming ends', () => {
            $swimWrapper.trigger('animationend');
            expect(wrapper.emitted('handleSwimEnd')[0][0]).toEqual({
              id,
              isHit: true,
            });
          });
        });
      });
    });
  });

  describe(`when game ${game.hasIntroState}`, () => {
    each(buttonSelectors, buttonSelector => {
      describe(`clicking ${buttonSelector}`, () => {
        const setGameIntroStateSpy = jest.fn();

        const wrapper = mountComponent({ setGameIntroStateSpy, gameState: game.hasIntroState });

        findByTestAttr(wrapper, 'showing-wrapper').trigger('animationend');

        it('should have drop with "is-disabled" class', () => {
          expect(findByTestAttr(wrapper, 'drop').classes()).toContain('is-disabled');
        });

        it('should not invoke "setGameIntroStateSpy" after click', () => {
          findByTestAttr(wrapper, buttonSelector).trigger('click');
          expect(setGameIntroStateSpy).not.toHaveBeenCalled();
        });

        it('should emit "handleSwimEnd" with is not hit flag', () => {
          findByTestAttr(wrapper, 'swim-wrapper').trigger('animationend');
          expect(wrapper.emitted('handleSwimEnd')[0][0]).toEqual({
            id,
            isHit: false,
          });
        });
      });
    });
  });

  describe(`when game ${game.hasCountingState}`, () => {
    const setGameIntroStateSpy = jest.fn();

    const wrapper = mountComponent({ setGameIntroStateSpy, gameState: game.hasCountingState });

    it('should have drop with "is-hidden" and "is-disabled" classes', () => {
      expect(findByTestAttr(wrapper, 'drop').classes()).toContain('is-hidden');
      expect(findByTestAttr(wrapper, 'drop').classes()).toContain('is-disabled');
    });

    each(buttonSelectors, buttonSelector => {
      it(`should not invoke "setGameIntroStateSpy" when ${buttonSelector} is clicked`, () => {
        findByTestAttr(wrapper, buttonSelector).trigger('click');
        expect(setGameIntroStateSpy).not.toHaveBeenCalled();
      });
    });

    it('should emit "handleSwimEnd" with is not hit flag', () => {
      findByTestAttr(wrapper, 'swim-wrapper').trigger('animationend');
      expect(wrapper.emitted('handleSwimEnd')[0][0]).toEqual({
        id,
        isHit: false,
      });
    });
  });
});
