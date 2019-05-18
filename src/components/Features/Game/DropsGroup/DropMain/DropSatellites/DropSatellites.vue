<template>
  <div :class="$style['satellites-wrapper']" :style="{ transform: satellitesRotate }">
    <drop-satellite
      data-test="satellite"
      v-for="satellite in 4"
      :key="satellite"
      :index="satellite"
      :is-visible="isSatelliteVisible"
    />
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';
import { game } from '@/store/game';

import DropSatellite from './DropSatellite/DropSatellite';

export default {
  components: {
    DropSatellite,
  },
  props: {
    isHit: {
      type: Boolean,
      required: true,
    },
    isDropMounted: {
      type: Boolean,
      required: true,
    },
    gameState: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      satellitesRotate: `rotate(${generateRandom(1, 360)}deg)`,
    };
  },
  computed: {
    isSatelliteVisible() {
      if ([game.hasGameRunningState, game.hasPristineState].includes(this.gameState)) {
        return this.isHit;
      }

      return !this.isHit && this.isDropMounted && this.gameState === game.hasCountingState;
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellites.scss" />
