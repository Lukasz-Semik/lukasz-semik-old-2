<template>
  <div :class="wrapperClassName" :style="{ left: leftOffsetAll }" @animationend.self="onSwimEnd">
    <div :class="$style['satelites-wrapper']" :style="{ transform: satellitesRotate }">
      <drop-satellites
        v-for="satellite in satellitesQty"
        :key="satellite"
        :index="satellite"
        :is-visible="isHit"
      />
    </div>

    <div :class="innerWrapperClassName" @animationend.self="onShowEnd">
      <button :class="$style['main-button']" @click="onMainHit"/>
      <button
        :class="$style['secondary-button']"
        :style="{ top: topOffsetSecondaryBtn, left: leftOffsetSecondaryBtn }"
      />
    </div>
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';

import DropSatellites from '../DropSatellites/DropSatellites';

const minOffsetSecBtn = 14;
const maxOffsetSecBtn = 56;
const minOffsetAll = 3;
const maxOffsetAll = 97;
const satellitesQty = 4;

export default {
  components: {
    DropSatellites,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isMounted: false,
      isSwimming: false,
      isHit: false,
      topOffsetSecondaryBtn: '0',
      leftOffsetSecondaryBtn: '0',
      leftOffsetAllRandom: '0',
      leftOffsetAll: '0',
      satellitesRotate: '0',
    };
  },
  created() {
    this.topOffsetSecondaryBtn = `${generateRandom(minOffsetSecBtn, maxOffsetSecBtn)}%`;
    this.leftOffsetSecondaryBtn = `${generateRandom(minOffsetSecBtn, maxOffsetSecBtn)}%`;

    const leftOffsetAllRandom = generateRandom(minOffsetAll, maxOffsetAll);
    this.leftOffsetAll =
      leftOffsetAllRandom >= 90
        ? `calc(${leftOffsetAllRandom}% - 5rem)`
        : `${leftOffsetAllRandom}%`;

    this.satellitesRotate = `rotate(${generateRandom(0, 360)}deg)`;

    setTimeout(() => {
      this.isMounted = true;
    }, generateRandom(0, 30000));
  },
  methods: {
    onShowEnd() {
      this.isSwimming = true;
    },
    onSwimEnd() {
      this.$emit('handleSwimEnd', { id: this.id });
    },
    onMainHit() {
      this.isHit = true;
    },
  },
  computed: {
    satellitesQty() {
      return satellitesQty;
    },
    wrapperClassName() {
      const { $style, isSwimming } = this;

      return {
        [$style['wrapper']]: true,
        [$style['is-swimming']]: isSwimming,
      };
    },
    innerWrapperClassName() {
      const { $style, isMounted, isHit } = this;

      return {
        [$style['inner-wrapper']]: true,
        [$style['is-visible']]: isMounted && !isHit,
        [$style['is-hit']]: isHit,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropMain.scss" />
