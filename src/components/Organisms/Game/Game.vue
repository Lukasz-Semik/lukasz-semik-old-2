<template>
  <div :class="[$style['wrapper']]">
    <h1>dsadasd</h1>
    <drops-group/>
  </div>
</template>

<script>
import { DropsGroup } from '@/components/Molecules';

export default {
  components: {
    DropsGroup,
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
