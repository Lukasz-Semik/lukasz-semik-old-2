<template>
  <div :class="[$style['wrapper']]">
    <background-element />
    <game />

    <div :class="[$style['title-wrapper']]">
      <wavy-title translation-path="underwater.welcomeText" />
    </div>
  </div>
</template>

<script>
import { BackgroundElement } from '@/components/Elements';
import { WavyTitle, Game } from '@/components/Features';

export default {
  name: 'UnderwaterPage',
  components: {
    BackgroundElement,
    WavyTitle,
    Game,
  },
};
</script>

<style lang="scss" module src="./UnderwaterPage.scss" />
