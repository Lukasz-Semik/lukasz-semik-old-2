<template>
  <div :class="$style['background']">
    <background-underwater />
    <div :class="overlayClassName" />
  </div>
</template>

<script>
import BackgroundUnderwater from '@/assets/backgrounds/background-uderwater.svg';

export default {
  name: 'BackgroundElement',
  components: {
    BackgroundUnderwater,
  },
  computed: {
    overlayClassName() {
      const { $style } = this;

      return {
        [$style['overlay']]: true,
      };
    },
  },
};
</script>

<style lang="scss" module src="./BackgroundElement.scss" />
