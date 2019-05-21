<template>
  <div :class="className" :style="{ transition: `all ${fallingTime} ease` }">
    <slot/>
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
  },
  data() {
    return {
      fallingTime: `${generateRandom(0, 3)}.${generateRandom(1, 9)}s`,
    };
  },
  computed: {
    className() {
      const { $style, isFallen } = this;

      return {
        [$style['inner-wrapper']]: true,
        [$style['is-fallen']]: isFallen,
      };
    },
  },
};
</script>

<style lang="scss" module src="./FallingElement.scss" />
