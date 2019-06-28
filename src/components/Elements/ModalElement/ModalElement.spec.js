import { shallowMount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import ModalElement from './ModalElement';

describe('<ModalElement />', () => {
  const slot = '<div data-test="slot">Slot</div>';

  const wrapper = shallowMount(ModalElement, {
    propsData: {
      title: 'Some title',
      name: 'modal-name',
    },
    slots: {
      default: slot,
    },
    mocks: {
      $t: key => key,
    },
  });

  it('should render properly', () => {
    expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
    expect(findByTestAttr(wrapper, 'modal-title').text()).toBe('Some title');
  });
});
