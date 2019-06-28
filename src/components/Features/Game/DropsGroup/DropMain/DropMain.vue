<template>
  <animated-element
    data-test="swim-wrapper"
    :class-name="swimWrapperClassName"
    :style-props="{ left: leftOffsetSwimWrapper }"
    is-game-pause-reacting
    @handleAnimationEnd="onSwimEnd"
  >
    <drop-satellites
      :game-state="gameState"
      :is-hit="isHit"
      :is-drop-mounted="isSwimming"
      :update-game-statistics="updateGameStatistics"
    />

    <animated-element
      data-test="showing-wrapper"
      :class-name="showingWrapperClassName"
      :style-props="{ animationDelay: showDelay }"
      is-game-pause-reacting
      @handleAnimationEnd="onShowEnd"
    >
      <animated-element data-test="drop" :class-name="dropClassName" is-game-pause-reacting>
        <button data-test="main-button" :class="$style['main-button']" @click="onClick" />
        <button
          data-test="secondary-button"
          :class="$style['secondary-button']"
          :style="{ top: topOffsetSecondaryBtn, left: leftOffsetSecondaryBtn }"
          @click="onClick"
        />
      </animated-element>
    </animated-element>
  </animated-element>
</template>

<script>
import { generateRandom } from '@/helpers/math';

import { game } from '@/store/game';
import { AnimatedElement } from '@/components/Elements';

import DropSatellites from './DropSatellites/DropSatellites';

export default {
  name: 'DropMain',
  components: {
    DropSatellites,
    AnimatedElement,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    gameState: {
      type: String,
      required: true,
    },
    setGameIntroState: {
      type: Function,
      required: true,
    },
    updateGameStatistics: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isHit: false,
      isSwimming: false,
      leftOffsetSwimWrapper: '0',
      topOffsetSecondaryBtn: `${generateRandom(14, 56)}%`,
      leftOffsetSecondaryBtn: `${generateRandom(14, 56)}%`,
      showDelay: `${generateRandom(0, 30)}.${generateRandom(0, 9)}s`,
    };
  },
  created() {
    const leftOffsetSwimWrapperRandom = generateRandom(3, 97);
    this.leftOffsetSwimWrapper =
      leftOffsetSwimWrapperRandom >= 90
        ? `calc(${leftOffsetSwimWrapperRandom}% - 5rem)`
        : `${leftOffsetSwimWrapperRandom}%`;
  },
  methods: {
    onClick() {
      if (this.gameState === game.hasPristineState && !this.isHit && this.isSwimming) {
        this.isHit = true;

        return this.setGameIntroState();
      }

      if (this.gameState === game.hasRunningState) {
        this.isHit = true;

        this.updateGameStatistics({
          score: 1,
        });
      }
    },
    onShowEnd() {
      this.isSwimming = true;
    },
    onSwimEnd() {
      this.$emit('handleSwimEnd', { id: this.id, isHit: this.isHit });
    },
  },
  computed: {
    swimWrapperClassName() {
      const { $style, isHit, isSwimming } = this;

      return {
        [$style['swim-wrapper']]: true,
        [$style['has-index-smaller']]: isHit,
        [$style['is-swimming']]: isSwimming,
      };
    },
    showingWrapperClassName() {
      const { $style, isSwimming, gameState } = this;

      return {
        [$style['showing-wrapper']]: true,
        [$style['has-showing-animation']]: gameState === game.hasCountingState ? isSwimming : true,
        [$style['has-full-visible-showing-animation']]: gameState === game.hasRunningState,
      };
    },
    dropClassName() {
      const { $style, isHit, gameState } = this;

      return {
        [$style['drop']]: true,
        [$style['is-hidden']]: isHit || gameState === game.hasCountingState,
        [$style['is-disabled']]:
          isHit || [game.hasCountingState, game.hasIntroState].includes(gameState),
      };
    },
  },
};
</script>

<style lang="scss" module src="./DropMain.scss" />
