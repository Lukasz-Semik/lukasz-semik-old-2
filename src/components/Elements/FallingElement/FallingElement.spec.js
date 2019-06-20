import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import FallingElement from './FallingElement';

describe('<FallingElement />', () => {
  const mountComponent = ({ isFallen = false, fallingTime = '', isLast = false } = {}) =>
    mount(FallingElement, {
      propsData: {
        isFallen,
        fallingTime,
        isLast,
      },
      slots: {
        default: '<div data-test="test-slot">Test slot</div>',
      },
    });

  describe('default component', () => {
    const wrapper = mountComponent();

    it('should render content with proper wrapper classes and not emit "handleLastFallen"', () => {
      const $wrapper = findByTestAttr(wrapper, 'wrapper');

      expect($wrapper.classes()).toContain('wrapper');
      expect($wrapper.classes()).not.toContain('is-fallen');

      $wrapper.trigger('transitionend');
      expect(wrapper.emitted('handleLastFallen')).toBeUndefined();
    });
  });

  describe('fallen component and provided fallingTime', () => {
    const wrapper = mountComponent({
      isFallen: true,
      fallingTime: '0.3s',
    });

    it('should render content with proper wrapper classes and not emit "handleLastFallen"', () => {
      const $wrapper = findByTestAttr(wrapper, 'wrapper');

      expect($wrapper.classes()).toContain('wrapper');
      expect($wrapper.classes()).toContain('is-fallen');

      $wrapper.trigger('transitionend');
      expect(wrapper.emitted('handleLastFallen')).toBeUndefined();
    });
  });

  describe('fallen last component', () => {
    const wrapper = mountComponent({
      isFallen: true,
      fallingTime: '0.3s',
      isLast: true,
    });

    it('should render content with proper wrapper classes and emit "handleLastFallen"', () => {
      const $wrapper = findByTestAttr(wrapper, 'wrapper');

      expect($wrapper.classes()).toContain('wrapper');
      expect($wrapper.classes()).toContain('is-fallen');

      $wrapper.trigger('transitionend');
      expect(wrapper.emitted('handleLastFallen')).toHaveLength(1);
    });
  });
});
