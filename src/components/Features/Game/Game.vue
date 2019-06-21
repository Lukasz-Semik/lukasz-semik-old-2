<template>
  <div :class="[$style['wrapper']]">
    <drops-group />

    <game-panel />

    <start-counter />

    <button v-if="shouldShowStartingButton" :class="$style['button']" @click="setGameCountingState">
      Start the Game!
    </button>

    <game-pause />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { game } from '@/store/game';

import DropsGroup from './DropsGroup/DropsGroup';
import StartCounter from './StartCounter/StartCounter';
import GamePanel from './GamePanel/GamePanel';
import GamePause from './GamePause/GamePause';

const { gameState, setGameCountingState, updateGameStatistics } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
    StartCounter,
    GamePanel,
    GamePause,
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
