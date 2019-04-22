<template>
  <h2 :class="$style['title']">
    <vertical-moving-element
      v-for="(letter, i) in text"
      :key="`${letter}-${i}`"
      :animation-delay="-i / 5"
      :has-animation="Boolean(letter.trim())"
    >
      <delayed-mount-element :delay="(i * 500) / 5" has-initial-content-width>{{ letter }}</delayed-mount-element>
    </vertical-moving-element>
  </h2>
</template>

<script>
import { DelayedMountElement, VerticalMovingElement } from '@/components/Atoms';

export default {
  name: 'WavyTitle',
  components: {
    DelayedMountElement,
    VerticalMovingElement,
  },
  computed: {
    text() {
      return 'Hi! I am Łukasz'.split('');
    },
  },
};
</script>

<style lang="scss" module src="./WavyTitle.scss" />
