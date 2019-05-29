<template>
  <div
    data-test="wrapper"
    :class="className"
    :style="{ transition: `all ${fallingDruation} ease` }"
    @transitionend.self="onFallingEnd"
  >
    <slot />
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';

export default {
  name: 'FallingElement',
  props: {
    isFallen: {
      type: Boolean,
      required: true,
    },
    fallingTime: {
      type: String,
      default: '',
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fallingDruation: this.fallingTime || `${generateRandom(0, 3)}.${generateRandom(1, 9)}s`,
    };
  },
  methods: {
    onFallingEnd() {
      if (this.isLast) {
        this.$emit('handleLastFallen');
      }
    },
  },
  computed: {
    className() {
      const { $style, isFallen } = this;

      return {
        [$style['wrapper']]: true,
        [$style['is-fallen']]: isFallen,
      };
    },
  },
};
</script>

<style lang="scss" module src="./FallingElement.scss" />
