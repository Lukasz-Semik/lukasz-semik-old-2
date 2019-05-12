<template>
  <div :class="[$style['wrapper']]">
    <drops-group />

    <button v-if="isPreGameState" :class="$style['button']" @click="setGameRunningState">
      Start the Game!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { game } from '@/store/game';

import DropsGroup from './DropsGroup/DropsGroup';

const { isPreGameState, setGameRunningState } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
  },
  computed: {
    ...mapGetters({ isPreGameState }),
  },
  methods: {
    ...mapMutations({ setGameRunningState }),
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
