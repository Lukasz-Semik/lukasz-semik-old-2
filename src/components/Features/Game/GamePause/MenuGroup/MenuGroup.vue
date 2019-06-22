<template>
  <div :class="$style['menu-wrapper']">
    <button
      data-test="resume-button"
      :class="$style['menu-item']"
      @click="$emit('handleResumeClick')"
    >
      {{ $t('underwater.resume') }}
    </button>

    <button
      v-if="isRestartButtonVisible"
      data-test="restart-button"
      :class="$style['menu-item']"
      @click="$emit('handleRestartClick')"
    >
      {{ $t('underwater.restart') }}
    </button>

    <button
      v-if="isIntroButtonVisible"
      data-test="intro-button"
      :class="$style['menu-item']"
      @click="$emit('handleIntroClick')"
    >
      {{ $t('underwater.intro') }}
    </button>

    <button
      v-if="isHomeButtonVisible"
      data-test="home-button"
      :class="$style['menu-item']"
      @click="$emit('handleHomeClick')"
    >
      {{ $t('underwater.home') }}
    </button>
  </div>
</template>

<script>
import { game } from '@/store/game';

export default {
  name: 'MenuGroup',
  props: {
    gameState: {
      type: String,
      required: true,
    },
  },
  computed: {
    isRestartButtonVisible() {
      return this.gameState === game.hasRunningState;
    },
    isHomeButtonVisible() {
      return this.gameState !== game.hasPristineState;
    },
    isIntroButtonVisible() {
      return [game.hasCountingState, game.hasRunningState].includes(this.gameState);
    },
  },
};
</script>

<style lang="scss" module src="./MenuGroup.scss" />
