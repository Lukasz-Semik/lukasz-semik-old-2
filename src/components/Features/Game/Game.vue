<template>
  <div :class="[$style['wrapper']]">
    <drops-group />

    <health-bar />

    <start-counter />

    <button v-if="shouldShowStartingButton" :class="$style['button']" @click="setGameCountingState">
      Start the Game!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { game } from '@/store/game';

import DropsGroup from './DropsGroup/DropsGroup';
import StartCounter from './StartCounter/StartCounter';
import HealthBar from './HealthBar/HealthBar';

const { gameState, setGameCountingState } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
    StartCounter,
    HealthBar,
  },
  computed: {
    ...mapGetters({ gameState }),
    shouldShowStartingButton() {
      return this.gameState === game.hasIntroState;
    },
  },
  methods: {
    ...mapMutations({ setGameCountingState }),
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
