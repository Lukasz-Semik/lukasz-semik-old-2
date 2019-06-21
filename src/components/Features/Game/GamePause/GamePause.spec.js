import { shallowMount } from '@vue/test-utils';

import { generateTestGameVuex } from '@/utils/tests';

import GamePause from './GamePause';

describe('<GamePause />', () => {
  it('should render properly', () => {
    expect(
      shallowMount(GamePause, {
        mocks: {
          $t: key => key,
        },
        ...generateTestGameVuex(),
      })
    ).toMatchSnapshot();
  });
});
