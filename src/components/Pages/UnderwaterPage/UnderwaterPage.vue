<template>
  <div :class="[$style['wrapper']]">
    <background-element />

    <div :class="[$style['title-wrapper']]">
      <wavy-title translation-path="underwater.welcomeText" />
    </div>
  </div>
</template>

<script>
import { BackgroundElement } from '@/components/Atoms';
import { WavyTitle } from '@/components/Molecules';

export default {
  name: 'UnderwaterPage',
  components: {
    BackgroundElement,
    WavyTitle,
  },
};
</script>

<style lang="scss" module src="./UnderwaterPage.scss" />
