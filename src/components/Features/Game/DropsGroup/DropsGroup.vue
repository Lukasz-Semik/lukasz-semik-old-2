<template>
  <div :class="$style['wrapper']">
    <drop-main v-for="drop in drops" :key="drop.id" :id="drop.id" @handleSwimEnd="onSwimEnd"/>
  </div>
</template>

<script>
import uuid from 'uuid/v4';

import DropMain from './DropMain/DropMain';

export default {
  components: {
    DropMain,
  },
  data() {
    return {
      drops: [],
    };
  },
  created() {
    // 40
    this.drops = new Array(40).fill(null).map(() => ({ id: uuid() }));
  },
  methods: {
    onSwimEnd({ id }) {
      this.drops = this.drops.map(drop => (drop.id === id ? { id: uuid() } : drop));
    },
  },
};
</script>

<style lang="scss" module src="./DropsGroup.scss" />
