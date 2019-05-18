<template>
  <div
    data-test="swim-wrapper"
    :class="swimWrapperClassName"
    :style="{ left: leftOffsetAll }"
    @animationend.self="onSwimEnd"
  >
    <drop-satellites :isHit="isHit"/>

    <div data-test="drop-wrapper" :class="dropWrapperClassName" @animationend.self="onShowEnd">
      <button data-test="main-button" :class="$style['main-button']" @click="onMainHit"/>
      <button
        data-test="secondary-button"
        :class="$style['secondary-button']"
        :style="{ top: topOffsetSecondaryBtn, left: leftOffsetSecondaryBtn }"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { generateRandom } from '@/helpers/math';
import { game } from '@/store/game';

import DropSatellites from './DropSatellites/DropSatellites';

const { hasGamePristineState, setGameIntroState } = game;

export default {
  name: 'DropMain',
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
      topOffsetSecondaryBtn: `${generateRandom(14, 56)}%`,
      leftOffsetSecondaryBtn: `${generateRandom(14, 56)}%`,
      leftOffsetAllRandom: '0',
      leftOffsetAll: '0',
    };
  },
  created() {
    const leftOffsetAllRandom = generateRandom(3, 97);
    this.leftOffsetAll =
      leftOffsetAllRandom >= 90
        ? `calc(${leftOffsetAllRandom}% - 5rem)`
        : `${leftOffsetAllRandom}%`;

    setTimeout(() => {
      this.isMounted = true;
    }, generateRandom(0, 30000));
  },
  methods: {
    ...mapMutations({ setGameIntroState }),
    onShowEnd() {
      this.isSwimming = true;
    },
    onSwimEnd() {
      this.$emit('handleSwimEnd', { id: this.id });
    },
    onMainHit() {
      if (this.hasGamePristineState) {
        this.isHit = true;

        return this.setGameIntroState();
      }
    },
  },
  computed: {
    ...mapGetters({
      hasGamePristineState,
    }),
    swimWrapperClassName() {
      const { $style, isSwimming } = this;

      return {
        [$style['swim-wrapper']]: true,
        [$style['is-swimming']]: isSwimming,
      };
    },
    dropWrapperClassName() {
      const { $style, isMounted, isHit } = this;

      return {
        [$style['drop-wrapper']]: true,
        [$style['is-visible']]: isMounted && !isHit,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropMain.scss" />
