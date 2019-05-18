<template>
  <div
    data-test="swim-wrapper"
    :class="swimWrapperClassName"
    :style="{ left: leftOffsetSwimWrapper }"
    @animationend.self="onSwimEnd"
  >
    <drop-satellites :is-hit="isHit" :is-drop-mounted="isMounted"/>

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

const { hasGamePristineState, hasGameCountingState, setGameIntroState } = game;

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
      leftOffsetSwimWrapper: '0',
    };
  },
  created() {
    const leftOffsetSwimWrapperRandom = generateRandom(3, 97);
    this.leftOffsetSwimWrapper =
      leftOffsetSwimWrapperRandom >= 90
        ? `calc(${leftOffsetSwimWrapperRandom}% - 5rem)`
        : `${leftOffsetSwimWrapperRandom}%`;

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
      hasGameCountingState,
    }),
    swimWrapperClassName() {
      const { $style, isSwimming } = this;

      return {
        [$style['swim-wrapper']]: true,
        [$style['is-swimming']]: isSwimming,
      };
    },
    dropWrapperClassName() {
      const { $style, isMounted, isHit, hasGameCountingState } = this;
      console.log(hasGameCountingState);
      return {
        [$style['drop-wrapper']]: true,
        [$style['is-visible']]: isMounted && !isHit && !hasGameCountingState,
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropMain.scss" />
