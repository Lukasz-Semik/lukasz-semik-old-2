<template>
  <div v-if="isVisible" :class="[$style['wrapper']]">
    <transition
      data-test="transition-wrapper"
      appear
      mode="out-in"
      :enter-active-class="$style['enter-active']"
      :enter-class="$style['enter']"
      @after-enter="onAfterEnter"
    >
      <p data-test="counter-3" key="3" v-if="counter === 3">3</p>
      <p data-test="counter-2" key="2" v-if="counter === 2">2</p>
      <p data-test="counter-1" key="1" v-if="counter === 1">1</p>

      <p key="start" :class="$style['start-text']" v-if="counter === 0">
        <falling-element
          data-test="falling-element"
          v-for="(letter, i) in letters"
          :key="`${letter.content}-${i}`"
          :is-fallen="isFallen"
          :falling-time="letter.delay"
          :is-last="letter.isLast"
          @handleLastFallen="onLastFallen"
          >{{ letter.content }}</falling-element>
      </p>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import { game } from '@/store/game';
import { FallingElement } from '@/components/Elements';

import { prepareLetters } from './startCounterHelpers';

const { gameState, isGamePaused, setGameRunningState } = game;

export default {
  name: 'StartCounter',
  components: {
    FallingElement,
  },
  watch: {
    isVisible(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.counter = 3;
        this.isFallen = false;
        this.letters = prepareLetters(this.$t('underwater.letsGo'));
      }
    },
  },
  data() {
    return {
      counter: 3,
      isFallen: false,
      letters: prepareLetters(this.$t('underwater.letsGo')),
    };
  },
  methods: {
    ...mapMutations({ setGameRunningState }),
    onAfterEnter() {
      if (this.counter === 0) {
        this.isFallen = true;
        return;
      }

      this.counter = this.counter - 1;
    },
    onLastFallen() {
      if (this.gameState !== game.hasRunningState) {
        this.setGameRunningState();
      }
    },
  },
  computed: {
    ...mapGetters({ gameState, isGamePaused }),
    isVisible() {
      return this.gameState == game.hasCountingState;
    },
  },
};
</script>

<style lang="scss" module src="./StartCounter.scss" />
