import { mount } from '@vue/test-utils';

import { findByTestAttr } from '@/utils/tests';

import HealthBar from './HealthBar';

describe('<HealthBar/>', () => {
  it('should render properly for max health points', () => {
    const wrapper = mount(HealthBar, {
      propsData: {
        healthPoints: 100,
      },
    });

    const $healthBar = findByTestAttr(wrapper, 'health-bar');
    expect($healthBar.classes()).toContain('health-bar');
    expect($healthBar.classes()).not.toContain('is-yellow');
    expect($healthBar.classes()).not.toContain('is-red');
  });

  it('should render properly for medium health points', () => {
    const wrapper = mount(HealthBar, {
      propsData: {
        healthPoints: 50,
      },
    });

    const $healthBar = findByTestAttr(wrapper, 'health-bar');
    expect($healthBar.classes()).toContain('health-bar');
    expect($healthBar.classes()).toContain('is-yellow');
    expect($healthBar.classes()).not.toContain('is-red');
  });

  it('should render properly for low health points', () => {
    const wrapper = mount(HealthBar, {
      propsData: {
        healthPoints: 20,
      },
    });

    const $healthBar = findByTestAttr(wrapper, 'health-bar');
    expect($healthBar.classes()).toContain('health-bar');
    expect($healthBar.classes()).toContain('is-yellow');
    expect($healthBar.classes()).toContain('is-red');
  });
});
