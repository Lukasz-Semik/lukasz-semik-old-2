<template>
  <div
    data-test="wrapper"
    v-if="isGameRunning"
    :class="$style['wrapper']"
    @animationend="isMounted = true"
  >
    <div :class="$style['board-wrapper']">
      <board-panel />
    </div>

    <div data-test="controls-wrapper" :class="controlsWrapperClassName">
      <health-bar :health-points="healthPoints" />

      <div :class="$style['counters-wrapper']">
        <div :class="$style['diamond-wrapper']">
          <counter-element :value="gameScore" :color="counterColor">
            <diamond-element />
          </counter-element>
        </div>

        <counter-element :value="gameGold" :color="counterColor">
          <coin-element />
        </counter-element>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';
import BoardPanel from '@/assets/underwater/board.svg';

import HealthBar from './HealthBar/HealthBar';
import { CoinElement, CounterElement, DiamondElement, counterColors } from '../Elements';

const { healthPoints, gameScore, gameGold, gameState } = game;

export default {
  name: 'GamePanel',
  components: {
    BoardPanel,
    HealthBar,
    CounterElement,
    CoinElement,
    DiamondElement,
  },
  data() {
    return {
      isMounted: false,
    };
  },
  computed: {
    ...mapGetters({ healthPoints, gameState, gameGold, gameScore }),
    counterColor() {
      return counterColors.gold;
    },
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
