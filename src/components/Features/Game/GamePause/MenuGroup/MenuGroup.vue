<template>
  <div :class="$style['menu-wrapper']">
    <button
      v-if="isResumeButtonVisible"
      data-test="resume-button"
      :class="$style['menu-item']"
      @click="$emit('handleResumeClick')"
    >{{ $t('underwater.resume') }}</button>

    <button
      v-if="isRestartButtonVisible"
      data-test="restart-button"
      :class="$style['menu-item']"
      @click="$emit('handleRestartClick')"
    >{{ $t('underwater.restart') }}</button>

    <button
      v-if="isIntroButtonVisible"
      data-test="intro-button"
      :class="$style['menu-item']"
      @click="$emit('handleIntroClick')"
    >{{ $t('underwater.intro') }}</button>

    <button
      v-if="isHomeButtonVisible"
      data-test="home-button"
      :class="$style['menu-item']"
      @click="$emit('handleHomeClick')"
    >{{ $t('underwater.home') }}</button>

    <div v-if="isGameSummaryVisible">
      <div :class="$style['score-wrapper']">
        <p data-test="score" :class="$style['text']">{{ $t('underwater.score')}}:</p>
        <counter-element :value="gameScore">
          <diamond-element/>
        </counter-element>
      </div>

      <div :class="$style['score-wrapper']">
        <p data-test="ranking" :class="$style['text']">{{ $t('underwater.ranking')}}: 1</p>
      </div>
    </div>
  </div>
</template>

<script>
import { game } from '@/store/game';

import { DiamondElement, CounterElement } from '../../Elements';

export default {
  name: 'MenuGroup',
  components: {
    DiamondElement,
    CounterElement,
  },
  props: {
    gameState: {
      type: String,
      required: true,
    },
    gameScore: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isResumeButtonVisible() {
      return this.gameState !== game.hasOverState;
    },
    isRestartButtonVisible() {
      return [game.hasRunningState, game.hasOverState].includes(this.gameState);
    },
    isHomeButtonVisible() {
      return this.gameState !== game.hasPristineState;
    },
    isIntroButtonVisible() {
      return [
        game.hasPristineState,
        game.hasCountingState,
        game.hasRunningState,
        game.hasOverState,
      ].includes(this.gameState);
    },
    isGameSummaryVisible() {
      return this.gameState === game.hasOverState;
    },
  },
};
</script>

<style lang="scss" module src="./MenuGroup.scss" />
