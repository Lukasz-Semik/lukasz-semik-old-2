import { mount } from '@vue/test-utils';
import { each } from 'lodash';

import { generateTestGameVuex, findAllByTestAttr } from '@/utils/tests';
import { game } from '@/store/game';

import DropSatellites from './DropSatellites';

describe('<DropSatellites>', () => {
  const mountSatellites = ({
    gameState = game.hasPristineState,
    isDropMounted = true,
    isHit = false,
    updateGameStatistics = jest.fn(),
  }) =>
    mount(DropSatellites, {
      propsData: {
        gameState,
        isDropMounted,
        isHit,
        updateGameStatistics,
      },
      ...generateTestGameVuex(),
    });

  describe('always invisible states', () => {
    each([game.hasPristineState, game.hasIntroState, game.hasCountingState], gameState => {
      it(`should not render satellites whan game ${gameState}`, () => {
        const $satellites = findAllByTestAttr(mountSatellites({ gameState }), 'satellite');

        expect($satellites).toHaveLength(0);
      });
    });

    each([game.hasPristineState, game.hasIntroState, game.hasCountingState], gameState => {
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

    it('should properly handle clicks on satellites ', () => {
      const updateGameStatisticsSpy = jest.fn();
      const wrapper = mountSatellites({
        gameState: game.hasRunningState,
        isDropMounted: true,
        isHit: true,
        updateGameStatistics: updateGameStatisticsSpy,
      });

      const $satellites = findAllByTestAttr(wrapper, 'satellite');

      $satellites.at(0).trigger('click');
      expect(updateGameStatisticsSpy).toHaveBeenCalledWith({
        score: 1,
        gold: 1,
      });

      $satellites.at(1).trigger('click');
      expect(updateGameStatisticsSpy).toHaveBeenCalledWith({
        score: 1,
        gold: 2,
      });

      $satellites.at(2).trigger('click');
      expect(updateGameStatisticsSpy).toHaveBeenCalledWith({
        score: 2,
        gold: 2,
      });

      $satellites.at(1).trigger('click');
      expect(updateGameStatisticsSpy).toHaveBeenCalledWith({
        score: 3,
        gold: 5,
      });
    });
  });
});
