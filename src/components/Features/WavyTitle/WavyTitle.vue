<template>
  <h2 :class="$style['title']">
    <animated-letter
      data-test="animated-letter"
      v-for="(letter, i) in text"
      :key="`${letter}-${i}`"
      :letter="letter"
      :index="i"
    />
  </h2>
</template>

<script>
import AnimatedLetter from './AnimatedLetter/AnimatedLetter';

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
    text() {
      return this.$t(this.translationPath).split('');
    },
  },
};
</script>

<style lang="scss" module src="./WavyTitle.scss" />
