import { shallowMount } from '@vue/test-utils';

import { findAllByTestAttr } from '@/helpers/tests';

import DropsGroup from './DropsGroup';

describe('<DropsGroup />', () => {
  const wrapper = shallowMount(DropsGroup);

  it('should render 40 drops', () => {
    expect(findAllByTestAttr(wrapper, 'drop')).toHaveLength(40);
  });
});
