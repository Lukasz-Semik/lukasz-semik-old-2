<template>
  <component
    :is="tag"
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
    tag: {
      type: String,
      default: 'div',
    },
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
  },
};
</script>

