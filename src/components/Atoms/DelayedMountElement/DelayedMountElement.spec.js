import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';

import DelayedMountElement from './DelayedMountElement';

describe('<DelayedMountElement>', () => {
  const defaultSlot = '<div data-test="test-slot">Test slot</div>';

  const slots = {
    default: defaultSlot,
  };

  it('should render properly without animation class if hasAnimation is not passed', () => {
    const wrapper = mount(DelayedMountElement, {
      slots,
    });

    const realContent = findByTestAttr(wrapper, 'real-content');
    expect(realContent).toThrowError();
    console.log(realContent);
  });
});
