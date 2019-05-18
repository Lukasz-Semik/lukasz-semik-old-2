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
      :is-visible="isHit"
    />
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';

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
  },
  data() {
    return {
      satellitesRotate: `rotate(${generateRandom(1, 360)}deg)`,
    };
  },
};
</script>

<style lang="scss" module src="./DropSatellites.scss" />
