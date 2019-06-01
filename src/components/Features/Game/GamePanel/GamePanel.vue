<template>
  <div v-if="isGameRunning" :class="$style['wrapper']" @animationend="isMounted = true">
    <div :class="$style['board-wrapper']">
      <board-panel/>
    </div>
    <div :class="controlsWrapperClassName">
      <health-bar :health-points="healthPoints"/>
      <points-counter :game-score="gameScore"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';
import BoardPanel from '@/assets/underwater/board.svg';
import FishElement from '@/assets/underwater/fish.svg';

import HealthBar from './HealthBar/HealthBar';
import PointsCounter from './PointsCounter/PointsCounter';

const { healthPoints, gameScore, gameState, updateGameScore } = game;

export default {
  name: 'GamePanel',
  components: {
    BoardPanel,
    FishElement,
    HealthBar,
    PointsCounter,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  computed: {
    ...mapGetters({ healthPoints, gameState, gameScore }),
    isGameRunning() {
      return this.gameState === game.hasRunningState;
    },
    controlsWrapperClassName() {
      const { $style, isMounted } = this;

      return {
        [$style['controls-wrapper']]: true,
        [$style['is-visible']]: isMounted,
      };
    },
  },
};
</script>

<style lang="scss" module src="./GamePanel.scss" />
