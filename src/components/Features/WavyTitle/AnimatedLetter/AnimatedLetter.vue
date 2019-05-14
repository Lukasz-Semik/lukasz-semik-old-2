<template>
  <div
    data-test="animated-letter"
    :style="{ animationDelay: `${animationDelay}s` }"
    :class="className"
  >
    <letter-content :letter="letter" :delay="(index * 600) / 5" />
  </div>
</template>

<script>
import LetterContent from './LetterContent/LetterContent';

export default {
  name: 'AnimatedLetter',
  components: {
    LetterContent,
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
  computed: {
    animationDelay() {
      return -this.index / 5;
    },
    className() {
      const { $style } = this;

      return {
        [$style['wrapper']]: true,
        [$style['wavy-move-animation']]: Boolean(this.letter.trim()),
      };
    },
  },
};
</script>

<style lang="scss" module src="./AnimatedLetter.scss" />
