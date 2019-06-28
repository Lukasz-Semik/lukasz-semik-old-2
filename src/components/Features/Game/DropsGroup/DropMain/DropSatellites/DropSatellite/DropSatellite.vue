<template>
  <animated-element
    v-if="isVisible"
    data-test="satellite"
    tag="button"
    :class-name="className"
    is-game-pause-reacting
    @handleClick="onHit"
  />
</template>

<script>
import { AnimatedElement } from '@/components/Elements';

export default {
  name: 'DropSatellite',
  components: {
    AnimatedElement,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isHit: false,
    };
  },
  methods: {
    onHit() {
      this.isHit = true;
    },
  },
  computed: {
    className() {
      const { $style, index, isHit, isVisible } = this;

      return {
        [$style['button']]: true,
        [$style[`button--${index}`]]: isVisible,
        [$style['is-hit']]: isHit,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellite.scss" />
