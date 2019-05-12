import { mount } from '@vue/test-utils';

import { findByTestAttr, findAllByTestAttr } from '@/helpers/tests';

import DropMain from './DropMain';

// TODO: adjust tests when game states are ready and add tests for secondary button

describe.skip('<DropMain />', () => {
  jest.useFakeTimers();

  const wrapper = mount(DropMain, {
    propsData: {
      id: 'some-id',
    },
  });

  const $wrapperElement = findByTestAttr(wrapper, 'wrapper');
  const $innerWrapperElement = findByTestAttr(wrapper, 'inner-wrapper');
  const $mainButton = findByTestAttr(wrapper, 'main-button');
  const $secondaryButton = findByTestAttr(wrapper, 'secondary-button');

  it('should set visible class on innerWrapper after timeout', () => {
    expect($innerWrapperElement.classes()).not.toContain('is-visible');

    jest.runAllTimers();

    expect($innerWrapperElement.classes()).toContain('is-visible');
  });

  it(`should render 4 satellites after hit,
      remove is-visible from innerWrapper, add is-hit class to innerWrapper`, () => {
    expect($innerWrapperElement.classes()).toContain('is-visible');
    expect($innerWrapperElement.classes()).not.toContain('is-hit');

    $mainButton.trigger('click');

    expect(findAllByTestAttr(wrapper, 'satellite')).toHaveLength(4);
    expect($innerWrapperElement.classes()).not.toContain('is-visible');
    expect($innerWrapperElement.classes()).toContain('is-hit');
  });

  it('should set properly styles attributes', () => {
    expect(findByTestAttr(wrapper, 'satellites-wrapper').attributes('style')).toContain(
      'transform: rotate'
    );
    expect($wrapperElement.attributes('style')).toContain('left');
    expect($secondaryButton.attributes('style')).toContain('left');
    expect($secondaryButton.attributes('style')).toContain('top');
  });

  it('should set is-swimming class to wrapper when innerWrapper show animation ends', () => {
    expect($wrapperElement.classes()).not.toContain('is-swimming');

    $innerWrapperElement.trigger('animationend');

    expect($wrapperElement.classes()).toContain('is-swimming');
  });

  it(`should render properly wrapper and emit 'handleSwimEnd' with id when animation end`, () => {
    $wrapperElement.trigger('animationend');

    expect(wrapper.emitted('handleSwimEnd')).toBeTruthy();
    expect(wrapper.emitted('handleSwimEnd')[0][0]).toEqual({ id: 'some-id' });
  });
});
