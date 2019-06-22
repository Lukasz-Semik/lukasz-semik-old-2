import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import MenuGroup from './MenuGroup';

// TODO: add tests when game over is ready

describe.skip('<MenuGroup />', () => {
  const wrapper = mount(MenuGroup, {
    mocks: {
      $t: key => key,
    },
  });

  it('should emit "handleResumeClick" when resume button is clicked', () => {
    findByTestAttr(wrapper, 'resume-button').trigger('click');
    expect(wrapper.emitted('handleResumeClick')).toHaveLength(1);
  });

  it('should emit "handleRestartClick" when resume button is clicked', () => {
    findByTestAttr(wrapper, 'restart-button').trigger('click');
    expect(wrapper.emitted('handleRestartClick')).toHaveLength(1);
  });
});
