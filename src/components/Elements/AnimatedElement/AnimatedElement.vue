<template>
  <component
    :is="tag"
    :data-test="testName"
    :class="className"
    :style="mergedStyles"
    @click="onClick"
    @animationend.self="onAnimationEnd"
  >
    <slot></slot>
  </component>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';

const { isGamePaused } = game;

export default {
  name: 'AnimatedElement',
  props: {
    className: {
      type: Object,
      default: () => {},
    },
    styleProps: {
      type: Object,
      default: () => {},
    },
    isGamePauseReacting: {
      type: Boolean,
      default: false,
    },
    testName: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  created() {
    this.onWindowBlur();
  },
  computed: {
    ...mapGetters({ isGamePaused }),
    mergedStyles() {
      return {
        ...this.styleProps,
        animationPlayState: this.isGamePauseReacting && this.isGamePaused ? 'paused' : 'running',
      };
    },
  },
  methods: {
    onAnimationEnd() {
      this.$emit('handleAnimationEnd');
    },
    onClick() {
      this.$emit('handleClick');
    },
    onWindowBlur() {
      window.onblur = () => console.log('onblur');
    },
  },
};
</script>

