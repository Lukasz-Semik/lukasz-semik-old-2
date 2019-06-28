<template>
  <div :class="$style['satellites-wrapper']" :style="{ transform: satellitesRotate }">
    <drop-satellite
      data-test="satellite"
      v-for="satellite in 4"
      :key="satellite"
      :index="satellite"
      :is-visible="isVisible"
      @handleSatelliteClick="onSatelliteClick"
    />
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';
import { game } from '@/store/game';

import DropSatellite from './DropSatellite/DropSatellite';

export default {
  name: 'DropSatellites',
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
    updateGameStatistics: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      satellitesRotate: `rotate(${generateRandom(1, 360)}deg)`,
      clickedItems: 0,
    };
  },
  methods: {
    onSatelliteClick() {
      this.clickedItems++;

      switch (this.clickedItems) {
        case 1:
          return this.updateGameStatistics({ score: 1, gold: 1 });
        case 2:
          return this.updateGameStatistics({ score: 1, gold: 2 });
        case 3:
          return this.updateGameStatistics({ score: 2, gold: 2 });
        case 4:
          return this.updateGameStatistics({ score: 3, gold: 5 });
        default:
          return;
      }
    },
  },
  computed: {
    isVisible() {
      return this.isHit && this.isDropMounted && this.gameState === game.hasRunningState;
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellites.scss" />
