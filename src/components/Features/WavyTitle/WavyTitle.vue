<template>
  <h2 v-if="isVisible" :class="$style['title']">
    <animated-letter
      data-test="animated-letter"
      v-for="(letter, i) in text"
      :is-fallen="isFallen"
      :key="`${letter}-${i}`"
      :letter="letter"
      :index="i"
    />
  </h2>
</template>

<script>
import { mapGetters } from 'vuex';
import { game } from '@/store/game';

import AnimatedLetter from './AnimatedLetter/AnimatedLetter';

const { gameState } = game;

export default {
  name: 'WavyTitle',
  components: {
    AnimatedLetter,
  },
  props: {
    translationPath: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({ gameState }),
    isFallen() {
      return this.gameState !== game.hasPristineState;
    },
    isVisible() {
      return this.gameState !== game.hasRunningState;
    },
    text() {
      return this.$t(this.translationPath).split('');
    },
  },
};
</script>

<style lang="scss" module src="./WavyTitle.scss" />
