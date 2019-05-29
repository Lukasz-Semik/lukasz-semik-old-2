<template>
  <div
    data-test="animated-letter"
    :style="{ animationDelay: `${animationDelay}s` }"
    :class="wrapperClassName"
  >
    <falling-element :is-fallen="isFallen">
      <letter-content :letter="letter" :delay="(index * 600) / 5" />
    </falling-element>
  </div>
</template>

<script>
import { FallingElement } from '@/components/Elements';
import LetterContent from './LetterContent/LetterContent';

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
    isFallen: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
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
  },
};
</script>

<style lang="scss" module src="./AnimatedLetter.scss" />
