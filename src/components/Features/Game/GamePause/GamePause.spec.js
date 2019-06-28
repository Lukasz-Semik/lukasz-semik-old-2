import { shallowMount } from '@vue/test-utils';

import { generateTestGameVuex } from '@/utils/tests';
import { game } from '@/store/game';

import GamePause from './GamePause';

describe('<GamePause />', () => {
  it('should render properly', () => {
    expect(
      shallowMount(GamePause, {
        mocks: {
          $t: key => key,
        },
        ...generateTestGameVuex({
          getters: {
            gameScore: () => 1,
            gameState: () => game.hasRunningState,
          },
        }),
      })
    ).toMatchSnapshot();
  });
});
