<template>
  <div :class="wrapperClassName" :style="{ left: leftOffsetAll }" @animationend.self="onSwimEnd">
    <div :class="$style['satelites-wrapper']">
      <drop-satellites v-for="item in 4" :key="item" :index="item" :is-visible="isHit"/>
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

const minOffset = 14;
const maxOffset = 56;

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
    };
  },
  created() {
    this.topOffsetSecondaryBtn = `${generateRandom(minOffset, maxOffset)}%`;
    this.leftOffsetSecondaryBtn = `${generateRandom(minOffset, maxOffset)}%`;
    this.leftOffsetAll = `${generateRandom(0, 85)}%`;

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
