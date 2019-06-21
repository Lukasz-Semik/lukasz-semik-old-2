import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import MenuGroup from './MenuGroup';

describe('<MenuGroup />', () => {
  const wrapper = mount(MenuGroup, {
    mocks: {
      $t: key => key,
    },
  });

  it('should emit "handleResumeClick" when resume button is clicked', () => {
    findByTestAttr(wrapper, 'resume-button').trigger('click');
    expect(wrapper.emitted('handleResumeClick')).toHaveLength(1);
  });
});
