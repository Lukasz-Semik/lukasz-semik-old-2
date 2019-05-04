<template>
  <div :class="$style['wrapper']">
    <DropElement :key="drop.id" :id="drop.id" v-for="drop in drops" @handleSwimEnd="onSwimEnd"/>
  </div>
</template>

<script>
import uuid from 'uuid/v4';

import { DropElement } from '@/components/Atoms';

export default {
  components: {
    DropElement,
  },
  data() {
    return {
      drops: [],
    };
  },
  created() {
    this.drops = new Array(30).fill(null).map(() => ({ id: uuid() }));
  },
  methods: {
    onSwimEnd({ id }) {
      this.drops = this.drops.map(drop => (drop.id === id ? { id: uuid() } : drop));
    },
  },
};
</script>

<style lang="scss" module src="./DropsGroup.scss" />
