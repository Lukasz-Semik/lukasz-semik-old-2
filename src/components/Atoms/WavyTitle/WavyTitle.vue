<template>
  <h2 :class="$style['title']">
    <div
      v-for="(letter, i) in text"
      :style="{ animationDelay: `${i / 5}s` }"
      :class="getWrapperClassName(letter)"
      :key="`${letter}-${i}`"
    >
      <span>{{ letter }}</span>
    </div>
  </h2>
</template>

<script>
export default {
  name: 'WavyTitle',
  computed: {
    text() {
      return 'Hi! I am Łukasz'.split('');
    },
  },
  methods: {
    getWrapperClassName(letter) {
      const { $style } = this;

      return {
        [$style['letter-wrapper']]: true,
        [$style['has-wave-animation']]: Boolean(letter.trim()),
      };
    },
    getLetterClassName(letter) {
      const { $style } = this;

      return {
        [$style['letter']]: true,
        [$style['has-show-animation']]: Boolean(letter.trim()),
      };
    },
  },
};
</script>

<style lang="scss" module src="./WavyTitle.scss" />
