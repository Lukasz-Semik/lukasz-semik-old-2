<template>
  <div :class="[$style['wrapper']]">
    <drops-group/>

    <game-panel/>

    <start-counter/>

    <button
      v-if="shouldShowStartingButton"
      :class="$style['button']"
      @click="setGameCountingState"
    >Start the Game!</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { game } from '@/store/game';

import DropsGroup from './DropsGroup/DropsGroup';
import StartCounter from './StartCounter/StartCounter';
import GamePanel from './GamePanel/GamePanel';

const { gameState, setGameCountingState, updateGameStatistics, setIsGamePaused } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
    StartCounter,
    GamePanel,
  },
  created() {
    if (window) {
      window.onblur = () => this.setIsGamePaused(true);
    }
  },
  computed: {
    ...mapGetters({ gameState }),
    shouldShowStartingButton() {
      return this.gameState === game.hasIntroState;
    },
  },
  methods: {
    ...mapMutations({ setGameCountingState, updateGameStatistics, setIsGamePaused }),
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
