<template>
  <div :class="[$style['wrapper']]">
    <background-element/>

    <div :class="[$style['title-wrapper']]">
      <wavy-title/>
    </div>
  </div>
</template>

<script>
import { BackgroundElement, WavyTitle } from '@/components/Atoms';

export default {
  name: 'UnderwaterPage',
  components: {
    BackgroundElement,
    WavyTitle,
  },
};
</script>

<style lang="scss" module src="./UnderwaterPage.scss" />
