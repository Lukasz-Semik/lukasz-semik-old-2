<template>
  <div :class="$style['background']">
    <background-underwater/>
    <div :class="overlayClassName"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BackgroundUnderwater from '@/assets/backgrounds/background-uderwater.svg';
import { game } from '@/store/game';

const { isPreGameState, isGameRunningState } = game;

export default {
  name: 'BackgroundElement',
  components: {
    BackgroundUnderwater,
  },
  computed: {
    ...mapGetters({ isPreGameState, isGameRunningState }),
    overlayClassName() {
      const { $style, isPreGameState, isGameRunningState } = this;

      return {
        [$style['overlay']]: true,
        [$style['has-medium-opacity']]: isPreGameState,
        [$style['has-no-opacity']]: isGameRunningState,
      };
    },
  },
};
</script>

<style lang="scss" module src="./BackgroundElement.scss" />
