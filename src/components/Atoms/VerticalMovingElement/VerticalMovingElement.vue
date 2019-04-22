<template>
  <div>
    <div :style="{ animationDelay: `${animationDelay}s` }" :class="getWrapperClassName">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalMovingElement',
  props: {
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
    getWrapperClassName() {
      const { $style, hasAnimation } = this;

      return {
        [$style['wrapper']]: true,
        [$style['has-animation']]: hasAnimation,
      };
    },
  },
};
</script>

<style lang="scss" module src="./VerticalMovingElement.scss" />
