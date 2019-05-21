import { shallowMount } from '@vue/test-utils';

import { findAllByTestAttr } from '@/helpers/tests';

import DropsGroup from './DropsGroup';

// TODO: test it when game.hasRunningState will be implemented
describe.skip('<DropsGroup />', () => {
  const wrapper = shallowMount(DropsGroup);

  it('should render 40 drops', () => {
    expect(findAllByTestAttr(wrapper, 'drop')).toHaveLength(40);
  });
});
