<template>
  <div
    data-test="animated-wrapper"
    :style="{ animationDelay: `${animationDelay}s` }"
    :class="getClassNames"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AnimatedElement',
  props: {
    animationClass: {
      type: String,
      default: '',
    },
    hasAnimation: {
      type: Boolean,
      default: false,
    },
    animationDelay: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    getClassNames() {
      const { $style, hasAnimation, animationClass } = this;

      return {
        [$style['wrapper']]: true,
        [animationClass]: hasAnimation,
      };
    },
  },
};
</script>

<style lang="scss" module src="./AnimatedElement.scss" />
