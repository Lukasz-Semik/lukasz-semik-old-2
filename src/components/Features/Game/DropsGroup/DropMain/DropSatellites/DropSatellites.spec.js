import { mount } from '@vue/test-utils';
import { each } from 'lodash';

import { findAllByTestAttr } from '@/helpers/tests';
import { game } from '@/store/game';

import DropSatellites from './DropSatellites';

describe('<DropSatellites>', () => {
  const mountSatellites = ({
    gameState = game.hasPristineState,
    isDropMounted = true,
    isHit = false,
  }) =>
    mount(DropSatellites, {
      propsData: {
        gameState,
        isDropMounted,
        isHit,
      },
    });

  describe('always invisible states', () => {
    each([game.hasPristineState, game.hasIntroState], gameState => {
      it(`should not render satellites whan game ${gameState}`, () => {
        const $satellites = findAllByTestAttr(mountSatellites({ gameState }), 'satellite');

        expect($satellites).toHaveLength(0);
      });
    });

    each([game.hasPristineState, game.hasIntroState], gameState => {
      it(`should not render satellites whan game ${gameState} even if drop is hit`, () => {
        const $satellites = findAllByTestAttr(
          mountSatellites({ gameState, isHit: true }),
          'satellite'
        );

        expect($satellites).toHaveLength(0);
      });
    });
  });

  describe(`when game ${game.hasRunningState}`, () => {
    it('should not render satellites if drop is not hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasRunningState }),
        'satellite'
      );

      expect($satellites).toHaveLength(0);
    });

    it('should not render satellites if drop is not mounted even if is hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasRunningState, isDropMounted: false, isHit: true }),
        'satellite'
      );

      expect($satellites).toHaveLength(0);
    });

    it('should render 4 satellites if drop is mounted and is hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasRunningState, isDropMounted: true, isHit: true }),
        'satellite'
      );

      expect($satellites).toHaveLength(4);
    });
  });

  describe(`when game ${game.hasCountingState}`, () => {
    it('should not render satellites if drop is mounted and is hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasCountingState, isDropMounted: true, isHit: true }),
        'satellite'
      );

      expect($satellites).toHaveLength(0);
    });

    it('should not render satellites if drop is not mounted and is not hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasCountingState, isDropMounted: false, isHit: false }),
        'satellite'
      );

      expect($satellites).toHaveLength(0);
    });

    it('should render 4 satellites if drop is mounted and is not hit', () => {
      const $satellites = findAllByTestAttr(
        mountSatellites({ gameState: game.hasCountingState, isDropMounted: true, isHit: false }),
        'satellite'
      );

      expect($satellites).toHaveLength(4);
    });
  });
});
