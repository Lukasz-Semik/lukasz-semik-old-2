<template>
  <div :class="$style['background']">
    <background-underwater/>
    <div :class="overlayClassName"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { game } from '@/store/game';
import BackgroundUnderwater from '@/assets/backgrounds/background-uderwater.svg';

const { gameState } = game;

export default {
  name: 'BackgroundElement',
  components: {
    BackgroundUnderwater,
  },
  computed: {
    ...mapGetters({ gameState }),
    overlayClassName() {
      const { $style } = this;

      return {
        [$style['overlay']]: true,
        [$style['is-fully-visible']]: [game.hasCountingState, game.hasRunningState].includes(
          this.gameState
        ),
      };
    },
  },
};
</script>

<style lang="scss" module src="./BackgroundElement.scss" />
