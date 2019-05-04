<template>
  <div :class="[$style['wrapper']]">
    <drops-group />
  </div>
</template>

<script>
import DropsGroup from './DropsGroup/DropsGroup';

export default {
  components: {
    DropsGroup,
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
