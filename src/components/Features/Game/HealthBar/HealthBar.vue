<template>
  <div v-if="isGameRunning" :class="$style['wrapper']">
    <div :class="$style['inner-wrapper']">
      <div data-test="health-bar" :class="healthBarClassName" :style="{ width: healthBarWidth }" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';

const { healthPoints, gameState } = game;
export default {
  name: 'HealthBar',
  computed: {
    ...mapGetters({ healthPoints, gameState }),
    isGameRunning() {
      return this.gameState === game.hasRunningState;
    },
    healthBarWidth() {
      return `${this.healthPoints}%`;
    },
    healthBarClassName() {
      const { $style, healthPoints } = this;

      return {
        [$style['health-bar']]: true,
        [$style['is-yellow']]: healthPoints < 60,
        [$style['is-red']]: healthPoints < 30,
      };
    },
  },
};
</script>

<style lang="scss" module src="./HealthBar.scss" />
