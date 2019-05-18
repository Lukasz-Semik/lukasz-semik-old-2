<template>
  <div :class="$style['wrapper']">
    <drop-main
      v-for="drop in drops"
      data-test="drop"
      :key="drop.id"
      :id="drop.id"
      @handleSwimEnd="onSwimEnd"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import uuid from 'uuid/v4';

import { game } from '@/store/game';

const { hasGameCountingState } = game;

import DropMain from './DropMain/DropMain';

const dropsQty = 40;

export default {
  name: 'DropsGroup',
  components: {
    DropMain,
  },
  data() {
    return {
      drops: [],
    };
  },
  created() {
    this.drops = new Array(dropsQty).fill(null).map(() => ({ id: uuid() }));
  },
  computed: {
    ...mapGetters({ hasGameCountingState }),
  },
  methods: {
    onSwimEnd({ id }) {
      if (this.hasGameCountingState) {
        return;
      }

      this.drops = this.drops.map(drop => (drop.id === id ? { id: uuid() } : drop));
    },
  },
};
</script>

<style lang="scss" module src="./DropsGroup.scss" />
