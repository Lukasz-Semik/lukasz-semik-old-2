<template>
  <div :class="[$style['wrapper']]">
    <drops-group :update-game-score="updateGameStatistics"/>

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

const { gameState, setGameCountingState, updateGameStatistics } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
    StartCounter,
    GamePanel,
  },
  computed: {
    ...mapGetters({ gameState }),
    shouldShowStartingButton() {
      return this.gameState === game.hasIntroState;
    },
  },
  methods: {
    ...mapMutations({ setGameCountingState, updateGameStatistics }),
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
