import { shallowMount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';

import AnimatedElement from './AnimatedElement';

describe('<AnimatedElement>', () => {
  const defaultSlot = '<div data-test="test-slot">Test slot</div>';

  const slots = {
    default: defaultSlot,
  };

  const propsData = {
    animationDelay: 1,
    animationClass: 'some-animation',
  };

  it('should render properly without animation class if hasAnimation is not passed', () => {
    const wrapper = shallowMount(AnimatedElement, {
      slots,
      propsData,
    });

    const slot = findByTestAttr(wrapper, 'test-slot');
    expect(slot.text()).toBe('Test slot');

    const animatedWrapper = findByTestAttr(wrapper, 'animated-wrapper');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 1s;');
    expect(animatedWrapper.classes()).toContain('wrapper');
    expect(animatedWrapper.classes()).not.toContain('some-animation');
  });

  it('should render properly without animation class if hasAnimation is not passed', () => {
    const wrapper = shallowMount(AnimatedElement, {
      slots,
      propsData: {
        ...propsData,
        hasAnimation: true,
      },
    });

    const slot = findByTestAttr(wrapper, 'test-slot');
    expect(slot.text()).toBe('Test slot');

    const animatedWrapper = findByTestAttr(wrapper, 'animated-wrapper');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 1s;');
    expect(animatedWrapper.classes()).toContain('wrapper');
    expect(animatedWrapper.classes()).toContain('some-animation');
  });
});
