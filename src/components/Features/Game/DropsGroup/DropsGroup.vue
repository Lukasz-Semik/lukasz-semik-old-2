<template>
  <div :class="$style['wrapper']">
    <drop-main
      v-for="drop in drops"
      data-test="drop"
      :key="drop.id"
      :id="drop.id"
      :game-state="gameState"
      :set-game-intro-state="setGameIntroState"
      @handleSwimEnd="onSwimEnd"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import uuid from 'uuid/v4';

import { game } from '@/store/game';

const { gameState, setGameIntroState } = game;

import DropMain from './DropMain/DropMain';

const dropsQty = 40;

export default {
  name: 'DropsGroup',
  components: {
    DropMain,
  },
  watch: {
    gameState(newVal) {
      if (newVal === game.hasRunningState) {
        this.drops = new Array(dropsQty).fill(null).map(() => ({ id: uuid() }));
      }
    },
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
    ...mapGetters({ gameState }),
  },
  methods: {
    ...mapMutations({ setGameIntroState }),
    onSwimEnd({ id }) {
      if (this.gameState === game.hasCountingState) {
        return;
      }

      this.drops = this.drops.map(drop => (drop.id === id ? { id: uuid() } : drop));
    },
  },
};
</script>

<style lang="scss" module src="./DropsGroup.scss" />
