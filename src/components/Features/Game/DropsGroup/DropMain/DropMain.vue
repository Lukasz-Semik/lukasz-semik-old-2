<template>
  <div
    data-test="wrapper"
    :class="wrapperClassName"
    :style="{ left: leftOffsetAll }"
    @animationend.self="onSwimEnd"
  >
    <div
      data-test="satellites-wrapper"
      :class="$style['satellites-wrapper']"
      :style="{ transform: satellitesRotate }"
    >
      <drop-satellite
        v-for="satellite in satellitesQty"
        data-test="satellite"
        :key="satellite"
        :index="satellite"
        :is-visible="isHit"
      />
    </div>

    <div data-test="inner-wrapper" :class="innerWrapperClassName" @animationend.self="onShowEnd">
      <button data-test="main-button" :class="$style['main-button']" @click="onMainHit" />
      <button
        data-test="secondary-button"
        :class="$style['secondary-button']"
        :style="{ top: topOffsetSecondaryBtn, left: leftOffsetSecondaryBtn }"
      />
    </div>
  </div>
</template>

<script>
import { generateRandom } from '@/helpers/math';

import DropSatellite from '../DropSatellite/DropSatellite';

const minOffsetSecBtn = 14;
const maxOffsetSecBtn = 56;
const minOffsetAll = 3;
const maxOffsetAll = 97;
const satellitesQty = 4;

export default {
  name: 'DropMain',
  components: {
    DropSatellite,
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

    this.satellitesRotate = `rotate(${generateRandom(1, 360)}deg)`;

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
