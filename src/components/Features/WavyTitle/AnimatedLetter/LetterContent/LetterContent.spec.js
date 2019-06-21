import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import LetterContent from './LetterContent';

describe('<LetterContent>', () => {
  jest.useFakeTimers();

  it(`should mount after timeout`, () => {
    const wrapper = mount(LetterContent, {
      propsData: {
        letter: 'a',
      },
    });

    expect(findByTestAttr(wrapper, 'real-letter').exists()).toBe(false);
    expect(findByTestAttr(wrapper, 'fake-letter').exists()).toBe(true);
    jest.runAllTimers();
    expect(findByTestAttr(wrapper, 'real-letter').exists()).toBe(true);
  });
});
