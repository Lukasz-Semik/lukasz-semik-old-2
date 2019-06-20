import { mount } from '@vue/test-utils';

import { generateTestGameVuex, findByTestAttr } from '@/utils/tests';

import AnimatedElement from './AnimatedElement';

describe('<AnimatedElement />', () => {
  const slot = '<span data-test="slot">Slot</span>';

  const mountComponent = ({ tag, isGamePauseReacting = false, isGamePaused = false } = {}) =>
    mount(AnimatedElement, {
      propsData: {
        tag,
        isGamePauseReacting,
        styleProps: {
          backgroundColor: 'red',
        },
      },
      slots: {
        default: slot,
      },
      ...generateTestGameVuex({
        getters: {
          isGamePaused: () => isGamePaused,
        },
      }),
    });

  describe('when game is not paused', () => {
    it('should render properly for given props', () => {
      const wrapper = mountComponent();

      const $element = wrapper.find('div');
      expect($element.exists()).toBe(true);
      expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
      expect($element.attributes('style')).toContain('animation-play-state: running;');
      expect($element.attributes('style')).toContain('background-color: red;');
    });

    it('should render properly for given props', () => {
      const wrapper = mountComponent({
        tag: 'button',
      });

      const $element = wrapper.find('button');
      expect($element.exists()).toBe(true);
      expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
      expect($element.attributes('style')).toContain('animation-play-state: running;');
      expect($element.attributes('style')).toContain('background-color: red;');
    });

    it('should render properly for given props', () => {
      const wrapper = mountComponent({
        isGamePauseReacting: true,
      });

      const $element = wrapper.find('div');
      expect($element.exists()).toBe(true);
      expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
      expect($element.attributes('style')).toContain('animation-play-state: running;');
      expect($element.attributes('style')).toContain('background-color: red;');
    });
  });

  describe('when game is paused', () => {
    it('should render properly for given props', () => {
      const wrapper = mountComponent({
        isGamePaused: true,
      });

      const $element = wrapper.find('div');
      expect($element.exists()).toBe(true);
      expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
      expect($element.attributes('style')).toContain('animation-play-state: running;');
      expect($element.attributes('style')).toContain('background-color: red;');
    });

    it('should render properly for given props', () => {
      const wrapper = mountComponent({
        isGamePaused: true,
        isGamePauseReacting: true,
      });

      const $element = wrapper.find('div');
      expect($element.exists()).toBe(true);
      expect(findByTestAttr(wrapper, 'slot').text()).toBe('Slot');
      expect($element.attributes('style')).toContain('animation-play-state: paused;');
      expect($element.attributes('style')).toContain('background-color: red;');
    });
  });
});
