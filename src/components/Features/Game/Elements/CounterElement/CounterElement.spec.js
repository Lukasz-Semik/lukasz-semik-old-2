import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/helpers/tests';

import CounterElement from './CounterElement';

describe('<CounterElement/>', () => {
  const slot = '<div data-test="slot"></div>';

  const mountComponent = (hasMultiplierHidden = false) =>
    mount(CounterElement, {
      slots: {
        default: slot,
      },
      propsData: {
        value: 10,
        color: 'green',
        isXHidden: hasMultiplierHidden,
      },
    });

  it('should render properly with multiplier', () => {
    const wrapper = mountComponent();
    const $value = findByTestAttr(wrapper, 'value');

    expect(findByTestAttr(wrapper, 'multiplier').exists()).toBe(true);
    expect(findByTestAttr(wrapper, 'slot').exists()).toBe(true);
    expect($value.text()).toBe('10');
  });

  it('should render properly with multiplier', () => {
    const wrapper = mountComponent(true);
    const $value = findByTestAttr(wrapper, 'value');

    expect(findByTestAttr(wrapper, 'multiplier').exists()).toBe(false);
    expect(findByTestAttr(wrapper, 'slot').exists()).toBe(true);
    expect($value.text()).toBe('10');
  });

  it('should render properly value and react on value add', () => {
    const wrapper = mountComponent();
    const $value = findByTestAttr(wrapper, 'value');

    expect($value.classes()).toContain('value');
    expect($value.classes()).not.toContain('is-adding');
    wrapper.setProps({
      value: 11,
    });
    expect($value.classes()).toContain('is-adding');
    $value.trigger('transitionend');
    expect($value.classes()).not.toContain('is-adding');
  });
});
