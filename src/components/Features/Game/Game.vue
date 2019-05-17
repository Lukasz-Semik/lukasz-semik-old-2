<template>
  <div :class="[$style['wrapper']]">
    <drops-group/>

    <button
      v-if="hasGameIntroState"
      :class="$style['button']"
      @click="setGameCountingState"
    >Start the Game!</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { game } from '@/store/game';

import DropsGroup from './DropsGroup/DropsGroup';

const { hasGameIntroState, setGameCountingState } = game;

export default {
  name: 'Game',
  components: {
    DropsGroup,
  },
  computed: {
    ...mapGetters({ hasGameIntroState }),
  },
  methods: {
    ...mapMutations({ setGameCountingState }),
  },
};
</script>

<style lang="scss" module src="./Game.scss" />
