<template>
  <div :class="$style['wrapper']">
    <drop-main
      v-for="drop in drops"
      :key="drop.id"
      :id="drop.id"
      :game-state="gameState"
      :set-game-intro-state="setGameIntroState"
      :is-game-paused="isGamePaused"
      @handleSwimEnd="onSwimEnd"
      @handleDropClick="onDropClick"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import uuid from 'uuid/v4';

import { game } from '@/store/game';

const {
  gameState,
  isGamePaused,
  substractHealthPoints,
  setGameIntroState,
  updateGameStatistics,
} = game;

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
    ...mapGetters({ gameState, isGamePaused }),
  },
  methods: {
    ...mapMutations({ setGameIntroState, substractHealthPoints, updateGameStatistics }),
    onSwimEnd({ id, isHit }) {
      if (this.gameState === game.hasCountingState) {
        return;
      }

      if (this.gameState === game.hasRunningState && !isHit) {
        this.substractHealthPoints();
      }

      this.drops = this.drops.map(drop => (drop.id === id ? { id: uuid() } : drop));
    },
    onDropClick() {
      this.updateGameStatistics();
    },
  },
};
</script>

<style lang="scss" module src="./DropsGroup.scss" />
