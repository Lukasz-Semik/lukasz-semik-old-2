import { mount } from '@vue/test-utils';

import { findByTestAttr, findAllByTestAttr } from '@/helpers/tests';
import game from '@/store/game';

import DropSatellites from './DropSatellites';

describe('<DropSatellites>', () => {
  const wrapper = mount(DropSatellites, {
    propsData: {
      gameState: game.hasPristineState,
      isDropMounted: true,
      isHit: false,
    },
  });

  it('should render 4 satellites with proper visibility', () => {
    const $satellites = findAllByTestAttr(wrapper, 'satellite');

    expect($satellites).toHaveLength(4);
  });
});
