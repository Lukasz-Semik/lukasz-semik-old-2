import { mount } from '@vue/test-utils';

import { findAllByTestAttr } from '@/helpers/tests';

import WavyTitle from './WavyTitle';

describe('<WaveyTitle />', () => {
  const text = 'some.text';
  const wrapper = mount(WavyTitle, {
    mocks: {
      $t: key => key,
    },
    propsData: {
      translationPath: text,
    },
  });

  it('should render elements with quantity equal to text length', () => {
    expect(findAllByTestAttr(wrapper, 'animated-letter')).toHaveLength(text.length);
  });
});
