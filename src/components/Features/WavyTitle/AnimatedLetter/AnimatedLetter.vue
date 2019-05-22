<template>
  <div
    data-test="animated-letter"
    :style="{ animationDelay: `${animationDelay}s` }"
    :class="wrapperClassName"
  >
    <falling-element :is-fallen="isFallen">
      <letter-content :letter="letter" :delay="(index * 600) / 5"/>
    </falling-element>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';
import { generateRandom } from '@/helpers/math';

import { FallingElement } from '@/components/Elements';
import LetterContent from './LetterContent/LetterContent';

const { gameState } = game;

export default {
  name: 'AnimatedLetter',
  components: {
    LetterContent,
    FallingElement,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    letter: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fallingTime: `${generateRandom(0, 3)}.${generateRandom(1, 9)}s`,
    };
  },
  computed: {
    ...mapGetters({ gameState }),
    animationDelay() {
      return -this.index / 5;
    },
    wrapperClassName() {
      const { $style, letter } = this;

      return {
        [$style['wrapper']]: true,
        [$style['wavy-move-animation']]: Boolean(letter.trim()),
      };
    },
    isFallen() {
      return this.gameState !== game.hasPristineState;
    },
  },
};
</script>

<style lang="scss" module src="./AnimatedLetter.scss" />
