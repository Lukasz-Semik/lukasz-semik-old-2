<template>
  <div :class="[$style['bb']]">
    <background-underwater/>
  </div>
</template>

<script>
import BackgroundUnderwater from '@/assets/backgrounds/background-uderwater.svg';

export default {
  name: 'BackgroundElement',
  components: {
    BackgroundUnderwater,
  },
};
</script>

<style lang="scss" module src="./BackgroundElement.scss" />
