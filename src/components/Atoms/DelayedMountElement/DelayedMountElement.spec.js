import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';

import DelayedMountElement from './DelayedMountElement';

describe('<DelayedMountElement>', () => {
  jest.useFakeTimers();
  const defaultSlot = '<div data-test="test-slot">Test slot</div>';

  const slots = {
    default: defaultSlot,
  };

  it(`should mount after timeout and without fake content
    if hasInitialContentWidth is not passed`, () => {
    const wrapper = mount(DelayedMountElement, {
      slots,
    });

    expect(findByTestAttr(wrapper, 'real-content').exists()).toBe(false);
    expect(findByTestAttr(wrapper, 'fake-content').exists()).toBe(false);
    jest.runAllTimers();
    expect(findByTestAttr(wrapper, 'real-content').exists()).toBe(true);
    expect(findByTestAttr(wrapper, 'fake-content').exists()).toBe(false);
  });

  it(`should mount after timeout with fake content if hasInitialContentWidth is passed`, () => {
    const wrapper = mount(DelayedMountElement, {
      slots,
      propsData: {
        hasInitialContentWidth: true,
      },
    });

    expect(findByTestAttr(wrapper, 'real-content').exists()).toBe(false);
    expect(findByTestAttr(wrapper, 'fake-content').exists()).toBe(true);
    jest.runAllTimers();
    expect(findByTestAttr(wrapper, 'real-content').exists()).toBe(true);
  });
});
