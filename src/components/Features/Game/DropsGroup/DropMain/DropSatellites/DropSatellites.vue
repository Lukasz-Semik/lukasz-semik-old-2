<template>
  <div
    data-test="satellites-wrapper"
    :class="$style['satellites-wrapper']"
    :style="{ transform: satellitesRotate }"
  >
    <drop-satellite
      v-for="satellite in 4"
      data-test="satellite"
      :key="satellite"
      :index="satellite"
      :is-visible="isSatelliteVisible"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { generateRandom } from '@/helpers/math';
import { game } from '@/store/game';

import DropSatellite from './DropSatellite/DropSatellite';

const { hasGameIntroState, hasGameCountingState, hasGameRunningState } = game;

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
  },
  data() {
    return {
      satellitesRotate: `rotate(${generateRandom(1, 360)}deg)`,
    };
  },
  computed: {
    ...mapGetters({ hasGameIntroState, hasGameCountingState, hasGameRunningState }),
    isSatelliteVisible() {
      if (this.hasGameRunningState) {
        return this.isHit;
      }

      return this.isHit
        ? !this.hasGameIntroState && !this.hasGameCountingState
        : this.hasGameCountingState && this.isDropMounted;
    },
  },
};
</script>

<style lang="scss" module src="./DropSatellites.scss" />
