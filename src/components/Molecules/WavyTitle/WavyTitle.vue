<template>
  <h2 :class="$style['title']">
    <animated-element
      data-test="letter-wrapper"
      v-for="(letter, i) in text"
      :key="`${letter}-${i}`"
      :animation-class="$style['wavy-move-animation']"
      :animation-delay="-i / 5"
      :has-animation="Boolean(letter.trim())"
    >
      <div data-test="letter" :class="$style['letter']">
        <delayed-mount-element
          :delay="(i * 600) / 5"
          :enter-active-class="$style['letter-enter-active']"
          :enter-class="$style['letter-enter']"
          has-initial-content-width
        >{{ letter }}</delayed-mount-element>
      </div>
    </animated-element>
  </h2>
</template>

<script>
import { DelayedMountElement, AnimatedElement } from '@/components/Atoms';

export default {
  name: 'WavyTitle',
  props: {
    translationPath: {
      type: String,
      required: true,
    },
  },
  components: {
    DelayedMountElement,
    AnimatedElement,
  },
  computed: {
    text() {
      return this.$t(this.translationPath).split('');
    },
  },
};
</script>

<style lang="scss" module src="./WavyTitle.scss" />
