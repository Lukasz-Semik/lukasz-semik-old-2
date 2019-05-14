import { shallowMount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';

import AnimatedLetter from './AnimatedLetter';

describe('<AnimatedLetter>', () => {
  it('should render properly with index 0 and normal letter', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: 'a',
      },
    });

    const animatedWrapper = findByTestAttr(wrapper, 'animated-letter');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 0s;');
    expect(animatedWrapper.classes()).toContain('wavy-move-animation');
  });

  it('should render properly without class for spaces', () => {
    const wrapper = shallowMount(AnimatedLetter, {
      propsData: {
        index: 0,
        letter: '  ',
      },
    });

    const animatedWrapper = findByTestAttr(wrapper, 'animated-letter');
    expect(animatedWrapper.attributes('style')).toBe('animation-delay: 0s;');
    expect(animatedWrapper.classes()).not.toContain('wavy-move-animation');
  });
});
