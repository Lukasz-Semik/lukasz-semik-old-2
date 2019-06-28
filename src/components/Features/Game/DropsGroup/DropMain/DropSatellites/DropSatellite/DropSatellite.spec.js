import { mount } from '@vue/test-utils';

import { generateTestGameVuex, findByTestAttr } from '@/utils/tests';

import DropSatellite from './DropSatellite';

describe('<DropSatellite />', () => {
  describe('when is not visible', () => {
    const wrapper = mount(DropSatellite, {
      propsData: {
        isVisible: false,
        index: 1,
      },
      ...generateTestGameVuex(),
    });

    it('should not render satellite', () => {
      expect(findByTestAttr(wrapper, 'satellite').exists()).toBe(false);
    });
  });

  describe('when is visible', () => {
    const wrapper = mount(DropSatellite, {
      propsData: {
        isVisible: true,
        index: 1,
      },
      ...generateTestGameVuex(),
    });

    it('should render satellite with proper main classes based on index', () => {
      const $satellite = findByTestAttr(wrapper, 'satellite');

      expect($satellite.exists()).toBe(true);
      expect($satellite.classes()).toContain('button--1');
      expect($satellite.classes()).toContain('button');
      expect($satellite.classes()).not.toContain('is-hit');
    });

    it('should add is-hit class after click and emit handleSatelliteClick', () => {
      findByTestAttr(wrapper, 'satellite').trigger('click');
      expect(findByTestAttr(wrapper, 'satellite').classes()).toContain('is-hit');
      expect(wrapper.emitted('handleSatelliteClick')).toHaveLength(1);
    });
  });
});
