import { shallowMount } from '@vue/test-utils';

import UnderwaterPage from './UnderwaterPage.vue';

describe('<UnderwaterPage />', () => {
  it('should render UnderwaterPage properly', () => {
    const wrapper = shallowMount(UnderwaterPage);

    expect(wrapper).toMatchSnapshot();
  });
});
